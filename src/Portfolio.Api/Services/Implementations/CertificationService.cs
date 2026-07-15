using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;
using Portfolio.Api.DTOs;
using Portfolio.Api.Services.Interfaces;

namespace Portfolio.Api.Services.Implementations;

public class CertificationService : ICertificationService
{
    private readonly PortfolioDbContext _db;
    private readonly IMapper _mapper;

    public CertificationService(PortfolioDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public async Task<List<CertificationDto>> GetAllAsync()
    {
        var certifications = await _db.Certifications
            .OrderBy(c => c.SortOrder)
            .AsNoTracking()
            .ToListAsync();

        return _mapper.Map<List<CertificationDto>>(certifications);
    }
}
