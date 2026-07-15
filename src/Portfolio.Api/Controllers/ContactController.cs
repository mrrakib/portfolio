using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Portfolio.Api.DTOs;
using Portfolio.Api.Models;
using Portfolio.Api.Services.Interfaces;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;
    private readonly IValidator<ContactRequestDto> _validator;

    public ContactController(IContactService contactService, IValidator<ContactRequestDto> validator)
    {
        _contactService = contactService;
        _validator = validator;
    }

    [HttpPost]
    [EnableRateLimiting("contact")]
    public async Task<IActionResult> Submit([FromBody] ContactRequestDto request)
    {
        if (!string.IsNullOrWhiteSpace(request.Honeypot))
            return Ok(ApiResponse<object>.Success(new { submitted = true }));

        var validation = await _validator.ValidateAsync(request);
        if (!validation.IsValid)
        {
            var errors = validation.Errors
                .Select(e => new ApiError { ErrorMessage = e.ErrorMessage, ErrorCode = e.PropertyName })
                .ToList();
            return BadRequest(ApiResponse<object>.Fail(errors));
        }

        await _contactService.SubmitAsync(request);
        return Ok(ApiResponse<object>.Success(new { submitted = true }, 201));
    }
}
