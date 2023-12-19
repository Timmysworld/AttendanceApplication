using Microsoft.AspNetCore.Mvc;

namespace TheGospelMission.Controllers;
[Route("api/[controller]")] //api/home
[ApiController]

public class HomeController: ControllerBase
{
    [HttpGet]
    [Route("/")]
    public IActionResult Index()
    {
        return Ok(new { Message = "Hello from API" });
    }
}

