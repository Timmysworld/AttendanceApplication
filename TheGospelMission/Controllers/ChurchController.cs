using Microsoft.AspNetCore.Mvc;
using TheGospelMission.Models;
using TheGospelMission.Services;

namespace TheGospelMission.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChurchController : ControllerBase
{
    private readonly ChurchServices _churchService;

    public ChurchController(ChurchServices churchService)
    {
        _churchService = churchService;
    }

    [HttpGet("allChurches")]
    public IActionResult GetChurchNames()
    {
        var churchNames = _churchService.GetChurchesAsync(); 
        return Ok(churchNames);
    }
}