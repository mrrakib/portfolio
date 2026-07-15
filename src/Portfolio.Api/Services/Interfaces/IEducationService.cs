using Portfolio.Api.DTOs;

namespace Portfolio.Api.Services.Interfaces;

public interface IEducationService
{
    Task<List<EducationDto>> GetAllAsync();
}
