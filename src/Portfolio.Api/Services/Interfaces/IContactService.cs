using Portfolio.Api.DTOs;

namespace Portfolio.Api.Services.Interfaces;

public interface IContactService
{
    Task<bool> SubmitAsync(ContactRequestDto request);
}
