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

    private readonly NotificationService _notificationService;


    public UserController(GospelMissionDbContext context,UserServices userService, UserManager<User> userManager, NotificationService notificationService )
    {
        _context = context;
        
        _userService = userService;

        _userManager = userManager;

        _notificationService = notificationService;
    }

    [HttpPost]
    [Route("Forgot-Password")]
    public async Task<IActionResult> ForgotPassword([FromBody] PasswordResetRequest resetRequest)
    {
        var user = await _userManager.FindByEmailAsync(resetRequest.Email);
        if(user == null)
        {   
            return NotFound();
        }
        _notificationService.AddNotification($"User {resetRequest.Email} needs a password reset", "OverSeer");
        return Ok("Password request submitted successfully, Admin will reset in 24hours. ");
    }
}
//TODO: NEED ENDPOINTS FOR EDITING A USER, AS WELL AS (DEACTIVATING A USER===ADMIN PRIVALAGE)
//TODO: NEED TO ADD LAST LOGGED IN TO USER MODEL 
//TODO: MAKE SURE USERS ARE ALSO CLASSIFIED AS MEMBERS FOR ATTENDANCE PURPOSES