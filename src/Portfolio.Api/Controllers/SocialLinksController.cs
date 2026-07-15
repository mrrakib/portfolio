using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Models;
using Portfolio.Api.Services.Interfaces;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/social-links")]
public class SocialLinksController : ControllerBase
{
    private readonly ISocialLinkService _socialLinkService;

    public SocialLinksController(ISocialLinkService socialLinkService)
    {
        _socialLinkService = socialLinkService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var links = await _socialLinkService.GetAllActiveAsync();
        return Ok(ApiResponse<object>.Success(links));
    }
}
