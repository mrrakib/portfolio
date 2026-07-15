using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Models;
using Portfolio.Api.Services.Interfaces;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CertificationsController : ControllerBase
{
    private readonly ICertificationService _certificationService;

    public CertificationsController(ICertificationService certificationService)
    {
        _certificationService = certificationService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var certifications = await _certificationService.GetAllAsync();
        return Ok(ApiResponse<object>.Success(certifications));
    }
}
