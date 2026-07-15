namespace Portfolio.Api.DTOs;

public class ExperienceDto
{
    public int Id { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsCurrent { get; set; }
    public string? CompanyUrl { get; set; }
    public string? CompanyLogoUrl { get; set; }
    public string? Location { get; set; }
}
