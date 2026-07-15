using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Models;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResumeController : ControllerBase
{
    private readonly IWebHostEnvironment _env;

    public ResumeController(IWebHostEnvironment env)
    {
        _env = env;
    }

    [HttpGet]
    public IActionResult Download()
    {
        var resumePath = Path.Combine(_env.WebRootPath ?? "wwwroot", "assets", "resume.pdf");

        if (!System.IO.File.Exists(resumePath))
            return NotFound(ApiResponse<object>.Fail("Resume not found", "NOT_FOUND", 404));

        var fileBytes = System.IO.File.ReadAllBytes(resumePath);
        return File(fileBytes, "application/pdf", "Resume.pdf");
    }
}
