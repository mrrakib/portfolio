using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Models;
using Portfolio.Api.Services.Interfaces;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly IProfileService _profileService;

    public ProfileController(IProfileService profileService)
    {
        _profileService = profileService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var profile = await _profileService.GetProfileAsync();
        if (profile is null)
            return NotFound(ApiResponse<object>.Fail("Profile not found", "NOT_FOUND", 404));

        return Ok(ApiResponse<object>.Success(profile));
    }
}
