namespace Portfolio.Api.DTOs;

public class GithubStatsDto
{
    public string Username { get; set; } = string.Empty;
    public string? AvatarUrl { get; set; }
    public string? ProfileUrl { get; set; }
    public int PublicRepos { get; set; }
    public int Followers { get; set; }
    public int Following { get; set; }
    public int TotalStars { get; set; }
    public List<GithubRepoDto> TopRepositories { get; set; } = new();
}

public class GithubRepoDto
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Url { get; set; } = string.Empty;
    public string? Language { get; set; }
    public int Stars { get; set; }
    public int Forks { get; set; }
}
