using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Models;
using Portfolio.Api.Services.Interfaces;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/github")]
public class GithubController : ControllerBase
{
    private readonly IGithubService _githubService;

    public GithubController(IGithubService githubService)
    {
        _githubService = githubService;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var stats = await _githubService.GetStatsAsync();
        if (stats is null)
            return NotFound(ApiResponse<object>.Fail("GitHub stats unavailable", "GITHUB_ERROR", 404));

        return Ok(ApiResponse<object>.Success(stats));
    }
}
