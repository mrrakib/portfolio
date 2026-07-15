using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;
using Portfolio.Api.DTOs;
using Portfolio.Api.Services.Interfaces;

namespace Portfolio.Api.Services.Implementations;

public class ProjectService : IProjectService
{
    private readonly PortfolioDbContext _db;
    private readonly IMapper _mapper;

    public ProjectService(PortfolioDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public async Task<List<ProjectDto>> GetAllAsync()
    {
        var projects = await _db.Projects
            .Include(p => p.Technologies)
            .OrderBy(p => p.SortOrder)
            .AsNoTracking()
            .ToListAsync();

        return _mapper.Map<List<ProjectDto>>(projects);
    }

    public async Task<ProjectDetailDto?> GetBySlugAsync(string slug)
    {
        var project = await _db.Projects
            .Include(p => p.Technologies)
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Slug == slug);

        return project is null ? null : _mapper.Map<ProjectDetailDto>(project);
    }
}
