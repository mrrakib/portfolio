using Portfolio.Api.DTOs;

namespace Portfolio.Api.Services.Interfaces;

public interface IProfileService
{
    Task<ProfileDto?> GetProfileAsync();
}
