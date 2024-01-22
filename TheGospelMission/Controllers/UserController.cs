using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheGospelMission.Data;
using TheGospelMission.Models;
using TheGospelMission.Services;
using System.Linq;
using TheGospelMission.ViewModels;
using System.Text.Json;

namespace TheGospelMission.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "UnitLeader , GroupLeader, Overseer")] 
public class UserController : ControllerBase
{
    private readonly GospelMissionDbContext _context;
    private readonly UserServices _userService;
    private readonly UserManager<User> _userManager;

    private readonly GroupServices _groupService;
    private readonly ILogger<UserController> _logger;

    public UserController(GospelMissionDbContext context,UserServices userService, UserManager<User> userManager, GroupServices groupService, ILogger<UserController> logger )
    {
        _context = context;
        _userService = userService;
        _userManager = userManager;
        _groupService = groupService;
        _logger = logger;

    }
    [HttpGet]
    [Route("allUsers")]
    public async Task<IActionResult> Users()
    {
        var users = await _userService.GetUsersAsync();
        // Modify the structure before returning the response

        return Ok(users);
    }

    [HttpGet]
    [Route("Dashboard/{groupId}")]
    public async Task<IActionResult> Dashboard(int groupId)
    {
        var currentUser = await _userManager.GetUserAsync(User);


        if(currentUser == null)
        {
            _logger.LogError("Current user is null. Token: {Token}", HttpContext.Request.Headers["Authorization"]);
            return NotFound("User not found");
        }

        bool isGroupLeader = await _userManager.IsInRoleAsync(currentUser,"GroupLeader");
        bool isUnitLeader = await _userManager.IsInRoleAsync(currentUser, "UnitLeader");

        if(!isGroupLeader && !isUnitLeader)
        {
            return Unauthorized("User is not authorized.");
        }

        var group = await  _groupService.GetGroupWithMembersAsync(groupId);

        if (group == null)
        {
            return NotFound($"Group with ID {groupId} not found");
        }

        // Check if the user is a leader of the specified group
        if (!(isGroupLeader && group.GroupLeaderUserId == currentUser.Id) &&
            !(isUnitLeader && group.UnitLeaderUserId == currentUser.Id))
        {
            return Unauthorized("User is not authorized for the specified group.");
        }


        // Fetch members for the specified group
        var members = group.Members.ToList();


        // Calculate total number of members in the group
        int totalMembers = members.Count;


        return Ok(new { Group = group, Members = members });
    }


    [HttpGet]
    [Route("profile/{userId}")]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Overseer")]
    public async Task<IActionResult> ViewProfile(string userId)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var profile = new UserProfileModel
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                Gender = user.Gender,
                IsActive = user.IsActive,
                LastLoggedOn = user.LastLoggedOn,
                Group = user.Group,
                Roles = _userManager.GetRolesAsync(user).Result.ToList(),
            };

            return Ok(profile);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
            return StatusCode(500, "An error occurred while processing the request.");
        }
    }

    // CURRENT USER VIEW
    ///<summary>
    /// current user is able to see his/her profile information
    ///</summary>
    ///
    [HttpGet]
    [Route("profile")]
    public async Task<IActionResult> View()
    {
        var currentUser = await _userService.GetUserAsync(User);
        if (currentUser == null)
        {
            return NotFound("Current user not found");
        }

        var profile = new UserProfileModel
        {
            Id = currentUser.Id,
            UserName = currentUser.UserName,
            Email = currentUser.Email,
            FirstName = currentUser.FirstName,
            LastName = currentUser.LastName

        };

        return Ok(profile);
    }

    [HttpPut]
    [Route("profile")]
    public async Task<IActionResult> UpdateProfile([FromBody] UserProfileModel profile)
    {
        if(ModelState.IsValid)
        {
            // Retrieve the user ID from the ClaimsPrincipal
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            // Ensure that the user ID is set in the UserProfileModel
            profile.Id = userId;

            try
            {

                var result = await _userService.UpdateUserProfileAsync(profile);
                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
        return Ok("User Updated Successfully");
    }

    [HttpPatch]
    [Route("{userId}/deactivate")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Overseer")]
    public async Task<IActionResult> DeactivateUser(string userId)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if(user == null)
            {
                return NotFound();
            }
            user.IsActive = false;

            // Update the user in the database
            var updateResult = await _userManager.UpdateAsync(user);
            if(updateResult.Succeeded)
            {
                return Ok("User is now deactivated");
            }
            return BadRequest("Failed to deactivate user.");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
            return StatusCode(500, "An error occurred while processing the request.");
        }
    }
}
