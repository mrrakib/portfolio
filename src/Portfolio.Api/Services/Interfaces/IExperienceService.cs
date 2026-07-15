using Portfolio.Api.DTOs;

namespace Portfolio.Api.Services.Interfaces;

public interface IExperienceService
{
    Task<List<ExperienceDto>> GetAllAsync();
}
