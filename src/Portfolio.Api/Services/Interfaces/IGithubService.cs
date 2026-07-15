using Portfolio.Api.DTOs;

namespace Portfolio.Api.Services.Interfaces;

public interface IGithubService
{
    Task<GithubStatsDto?> GetStatsAsync();
}
