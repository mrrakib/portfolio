namespace Portfolio.Api.DTOs;

public class MetaDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? Keywords { get; set; }
    public string? OgImage { get; set; }
    public string? OgUrl { get; set; }
    public string? CanonicalUrl { get; set; }
}
