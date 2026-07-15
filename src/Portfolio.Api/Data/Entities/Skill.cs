namespace Portfolio.Api.Data.Entities;

public class Skill
{
    public int Id { get; set; }
    public int SkillCategoryId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int ProficiencyLevel { get; set; }
    public string? Icon { get; set; }
    public int SortOrder { get; set; }
    public DateTime CreatedAt { get; set; }

    public SkillCategory SkillCategory { get; set; } = null!;
}
