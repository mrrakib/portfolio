using System.Net.Http.Headers;
using System.Text.Json;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Portfolio.Api.Configuration;
using Portfolio.Api.DTOs;
using Portfolio.Api.Services.Interfaces;

namespace Portfolio.Api.Services.Implementations;

public class GithubService : IGithubService
{
    private readonly GithubOptions _options;
    private readonly IMemoryCache _cache;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<GithubService> _logger;

    private const string CacheKey = "github_stats";

    public GithubService(
        IOptions<GithubOptions> options,
        IMemoryCache cache,
        IHttpClientFactory httpClientFactory,
        ILogger<GithubService> logger)
    {
        _options = options.Value;
        _cache = cache;
        _httpClientFactory = httpClientFactory;
        _logger = logger;
    }

    public async Task<GithubStatsDto?> GetStatsAsync()
    {
        if (_cache.TryGetValue(CacheKey, out GithubStatsDto? cached))
            return cached;

        try
        {
            var stats = await FetchFromGithubAsync();
            if (stats is not null)
            {
                _cache.Set(CacheKey, stats, TimeSpan.FromMinutes(_options.CacheMinutes));
            }
            return stats;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch GitHub stats for {Username}", _options.Username);
            return null;
        }
    }

    private async Task<GithubStatsDto?> FetchFromGithubAsync()
    {
        if (string.IsNullOrWhiteSpace(_options.Username))
            return null;

        var client = _httpClientFactory.CreateClient("Github");

        var userJson = await client.GetStringAsync($"users/{_options.Username}");
        var user = JsonDocument.Parse(userJson).RootElement;

        var reposJson = await client.GetStringAsync(
            $"users/{_options.Username}/repos?sort=stars&direction=desc&per_page=10&type=owner");
        var repos = JsonDocument.Parse(reposJson).RootElement;

        var totalStars = 0;
        var topRepos = new List<GithubRepoDto>();

        foreach (var repo in repos.EnumerateArray())
        {
            var stars = repo.GetProperty("stargazers_count").GetInt32();
            totalStars += stars;

            topRepos.Add(new GithubRepoDto
            {
                Name = repo.GetProperty("name").GetString() ?? "",
                Description = repo.GetProperty("description").ValueKind == JsonValueKind.Null
                    ? null
                    : repo.GetProperty("description").GetString(),
                Url = repo.GetProperty("html_url").GetString() ?? "",
                Language = repo.GetProperty("language").ValueKind == JsonValueKind.Null
                    ? null
                    : repo.GetProperty("language").GetString(),
                Stars = stars,
                Forks = repo.GetProperty("forks_count").GetInt32()
            });
        }

        return new GithubStatsDto
        {
            Username = _options.Username,
            AvatarUrl = user.GetProperty("avatar_url").GetString(),
            ProfileUrl = user.GetProperty("html_url").GetString(),
            PublicRepos = user.GetProperty("public_repos").GetInt32(),
            Followers = user.GetProperty("followers").GetInt32(),
            Following = user.GetProperty("following").GetInt32(),
            TotalStars = totalStars,
            TopRepositories = topRepos
        };
    }
}
