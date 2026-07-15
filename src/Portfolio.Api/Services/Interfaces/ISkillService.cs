using Portfolio.Api.DTOs;

namespace Portfolio.Api.Services.Interfaces;

public interface ISkillService
{
    Task<List<SkillCategoryDto>> GetAllGroupedAsync();
}
