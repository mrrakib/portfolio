using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;
using Portfolio.Api.DTOs;
using Portfolio.Api.Services.Interfaces;

namespace Portfolio.Api.Services.Implementations;

public class SocialLinkService : ISocialLinkService
{
    private readonly PortfolioDbContext _db;
    private readonly IMapper _mapper;

    public SocialLinkService(PortfolioDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public async Task<List<SocialLinkDto>> GetAllActiveAsync()
    {
        var links = await _db.SocialLinks
            .Where(l => l.IsActive)
            .OrderBy(l => l.SortOrder)
            .AsNoTracking()
            .ToListAsync();

        return _mapper.Map<List<SocialLinkDto>>(links);
    }
}
