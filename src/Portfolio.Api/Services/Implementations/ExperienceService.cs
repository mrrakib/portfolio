using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;
using Portfolio.Api.DTOs;
using Portfolio.Api.Services.Interfaces;

namespace Portfolio.Api.Services.Implementations;

public class ExperienceService : IExperienceService
{
    private readonly PortfolioDbContext _db;
    private readonly IMapper _mapper;

    public ExperienceService(PortfolioDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public async Task<List<ExperienceDto>> GetAllAsync()
    {
        var experiences = await _db.Experiences
            .OrderBy(e => e.SortOrder)
            .AsNoTracking()
            .ToListAsync();

        return _mapper.Map<List<ExperienceDto>>(experiences);
    }
}
