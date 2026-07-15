namespace Portfolio.Api.DTOs;

public class ProjectDetailDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? ShortDescription { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public string? LiveUrl { get; set; }
    public string? GithubUrl { get; set; }
    public bool IsFeatured { get; set; }
    public List<string> Technologies { get; set; } = new();
}
