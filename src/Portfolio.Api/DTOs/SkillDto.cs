namespace Portfolio.Api.DTOs;

public class SkillDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int ProficiencyLevel { get; set; }
    public string? Icon { get; set; }
}
