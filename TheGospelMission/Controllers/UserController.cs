using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TheGospelMission.Data;
using TheGospelMission.Models;
using TheGospelMission.Services;

namespace TheGospelMission.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly GospelMissionDbContext _context;
    private readonly UserServices _userService;
    private readonly UserManager<User> _userManager;

    public UserController(GospelMissionDbContext context,UserServices userService, UserManager<User> userManager, NotificationService notificationService )
    {
        _context = context;
        
        _userService = userService;

        _userManager = userManager;

    }

    [HttpGet]
    [Route("Dashboard")]
    public async Task<IActionResult> Dashboard()
    {
        return Ok();
    }
}
//TODO: NEED ENDPOINTS FOR EDITING A USER
//TODO: MAKE SURE USERS ARE ALSO CLASSIFIED AS MEMBERS FOR ATTENDANCE PURPOSES