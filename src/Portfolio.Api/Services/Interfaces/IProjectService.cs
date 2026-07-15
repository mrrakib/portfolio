using Portfolio.Api.DTOs;

namespace Portfolio.Api.Services.Interfaces;

public interface IProjectService
{
    Task<List<ProjectDto>> GetAllAsync();
    Task<ProjectDetailDto?> GetBySlugAsync(string slug);
}
