using Portfolio.Api.DTOs;

namespace Portfolio.Api.Services.Interfaces;

public interface ISocialLinkService
{
    Task<List<SocialLinkDto>> GetAllActiveAsync();
}
