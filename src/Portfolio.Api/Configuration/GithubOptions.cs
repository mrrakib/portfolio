namespace Portfolio.Api.Configuration;

public class GithubOptions
{
    public const string SectionName = "Github";

    public string Username { get; set; } = string.Empty;
    public string? Token { get; set; }
    public int CacheMinutes { get; set; } = 60;
}
