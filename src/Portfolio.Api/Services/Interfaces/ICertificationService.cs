using Portfolio.Api.DTOs;

namespace Portfolio.Api.Services.Interfaces;

public interface ICertificationService
{
    Task<List<CertificationDto>> GetAllAsync();
}
