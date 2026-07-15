namespace Portfolio.Api.DTOs;

public class ProfileDto
{
    public string FullName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? Subtitle { get; set; }
    public string? Bio { get; set; }
    public string? AvatarUrl { get; set; }
    public string? Tagline { get; set; }
    public string? Location { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? ResumeUrl { get; set; }
}
