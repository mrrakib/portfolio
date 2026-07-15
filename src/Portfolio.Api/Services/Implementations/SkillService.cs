using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;
using Portfolio.Api.DTOs;
using Portfolio.Api.Services.Interfaces;

namespace Portfolio.Api.Services.Implementations;

public class SkillService : ISkillService
{
    private readonly PortfolioDbContext _db;
    private readonly IMapper _mapper;

    public SkillService(PortfolioDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public async Task<List<SkillCategoryDto>> GetAllGroupedAsync()
    {
        var categories = await _db.SkillCategories
            .Include(c => c.Skills)
            .OrderBy(c => c.SortOrder)
            .AsNoTracking()
            .ToListAsync();

        return _mapper.Map<List<SkillCategoryDto>>(categories);
    }
}
