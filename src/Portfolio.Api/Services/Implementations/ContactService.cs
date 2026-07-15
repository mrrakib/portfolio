using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;
using Portfolio.Api.Data.Entities;
using Portfolio.Api.DTOs;
using Portfolio.Api.Services.Interfaces;

namespace Portfolio.Api.Services.Implementations;

public class ContactService : IContactService
{
    private readonly PortfolioDbContext _db;
    private readonly IMapper _mapper;
    private readonly ILogger<ContactService> _logger;

    public ContactService(PortfolioDbContext db, IMapper mapper, ILogger<ContactService> logger)
    {
        _db = db;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<bool> SubmitAsync(ContactRequestDto request)
    {
        var message = _mapper.Map<ContactMessage>(request);
        message.CreatedAt = DateTime.UtcNow;

        _db.ContactMessages.Add(message);
        await _db.SaveChangesAsync();

        _logger.LogInformation("Contact message received from {Email}", request.Email);
        return true;
    }
}
