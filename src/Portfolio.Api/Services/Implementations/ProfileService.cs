using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;
using Portfolio.Api.DTOs;
using Portfolio.Api.Services.Interfaces;

namespace Portfolio.Api.Services.Implementations;

public class ProfileService : IProfileService
{
    private readonly PortfolioDbContext _db;
    private readonly IMapper _mapper;

    public ProfileService(PortfolioDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public async Task<ProfileDto?> GetProfileAsync()
    {
        var profile = await _db.Profiles.FirstOrDefaultAsync();
        return profile is null ? null : _mapper.Map<ProfileDto>(profile);
    }
}
