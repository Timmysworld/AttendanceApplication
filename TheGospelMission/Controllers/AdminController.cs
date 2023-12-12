using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TheGospelMission.Data;
using TheGospelMission.Models;
using TheGospelMission.Services;
using TheGospelMission.ViewModels;

namespace TheGospelMission.Controllers
{
    [Route("api/[controller]")] 
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Overseer")] 
    public class AdminController(GospelMissionDbContext context,UserManager<User> userManager, UserServices userService,GroupServices groupService, MemberServices memberService, NotificationService notificationService) : ControllerBase
    {
        private readonly GospelMissionDbContext _context = context;
        private readonly UserManager<User> _userManager = userManager;
        private readonly UserServices _userService = userService;
        private readonly GroupServices _groupService = groupService;
        private readonly MemberServices _memberService = memberService;

        private readonly NotificationService _notificationService = notificationService;

        [HttpGet]
        [Route("Dashboard")]
        public async Task<IActionResult> Dashboard()
        {
            var totalUsers = await _userService.TotalUserCountAsync();
            var totalGroups = await _groupService.TotalGroupsCountAsync();
            var totalMembers = await _memberService.TotalMembersCountAsync();

            var viewModel = new AdminDashboardViewModel
            {
                TotalGroups = totalGroups,
                TotalMembers = totalMembers,
                TotalUsers = totalUsers,
            };

            return new JsonResult(viewModel);
        }

        //USER MANAGEMENT 
        ///<summary>
        /// Manages USERS, assign them roles as well as to groups as leader
        ///</summary>
        ///
        [HttpPost]
        [Route("UserManagement/{userId}")]
        public async Task<IActionResult> UserManagement(string userId, [FromBody] UserManagementModel userMModel)
        {
            if (userMModel == null)
            {
                return BadRequest("Invalid request body");
            }

            try
            {
                await _userService.AssignGroup(userMModel.UserId, userMModel.GroupId, userMModel.IsGroupLeader, userMModel.IsUnitLeader);
                await _context.SaveChangesAsync();
                return Ok("User assigned to group successfully.");
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return StatusCode(500, "An error occurred while processing the request.");
            }
        }

        ///summary
        /// RESTS USER PASSWORD after User requests
        /// </summary>
        /// 
        [HttpPost]
        [Route("Reset-Password")]
        public async Task<IActionResult> ResetPassword([FromBody] PasswordResetRequest passwordReset)
        {
            var user = await _userManager.FindByIdAsync(passwordReset.UserId);
            if(user == null)
            {
                return NotFound();
            }

            var newPassword = "Password2!"; // need to change to secure mechanism
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user,token,newPassword);

            if(result.Succeeded)
            {
                _notificationService.AddNotification($"Your password has been reset. Please log in with Temporary Password.");
                return Ok("Password reset successful");
            }
            else
            {
                return BadRequest("Password Reset Failed.");
            }
        }

    }


}

//TODO: DEACTIVATE USER
//TODO: READ, UPDATE AND DEACTIVATE ATTENDANCE RECORDS