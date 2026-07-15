namespace Portfolio.Api.Data.Entities;

public class SkillCategory
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public string? Icon { get; set; }
    public DateTime CreatedAt { get; set; }

    public ICollection<Skill> Skills { get; set; } = new List<Skill>();
}
