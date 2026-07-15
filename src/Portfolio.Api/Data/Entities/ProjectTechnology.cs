namespace Portfolio.Api.Data.Entities;

public class ProjectTechnology
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string TechnologyName { get; set; } = string.Empty;
    public int SortOrder { get; set; }

    public Project Project { get; set; } = null!;
}
