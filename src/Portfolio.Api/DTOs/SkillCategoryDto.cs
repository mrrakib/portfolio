namespace Portfolio.Api.DTOs;

public class SkillCategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Icon { get; set; }
    public List<SkillDto> Skills { get; set; } = new();
}
