using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;
using Portfolio.Api.DTOs;
using Portfolio.Api.Services.Interfaces;

namespace Portfolio.Api.Services.Implementations;

public class EducationService : IEducationService
{
    private readonly PortfolioDbContext _db;
    private readonly IMapper _mapper;

    public EducationService(PortfolioDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public async Task<List<EducationDto>> GetAllAsync()
    {
        var educations = await _db.Educations
            .OrderBy(e => e.SortOrder)
            .AsNoTracking()
            .ToListAsync();

        return _mapper.Map<List<EducationDto>>(educations);
    }
}
