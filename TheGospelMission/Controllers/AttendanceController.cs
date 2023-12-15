using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TheGospelMission.Models;
using TheGospelMission.Services;
using TheGospelMission.ViewModels;

namespace TheGospelMission.COntrollers;

[ApiController]
[Route("api/[controller]")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "UnitLeader , GroupLeader")] 
public class AttendanceController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly GroupServices _groupService;
    private readonly AttendanceServices _attendanceService;
    public AttendanceController(UserManager<User> userManager, GroupServices groupServices, AttendanceServices attendanceService)
    {
        _userManager = userManager;
        _groupService = groupServices;
        _attendanceService = attendanceService;
    }

    [HttpGet]
    [Route("{groupId}")]
    public async Task<IActionResult> Attendance(int groupId)
    {
        try
        {
            var currentUser = await _userManager.GetUserAsync(User);
            if (currentUser == null)
            {
                return NotFound("User not found");
            }

            int userGroupId = (int)currentUser.GroupId;
            var groupMembers = await _groupService.GetGroupWithMembersAsync(groupId);

            var attendanceViewModel = new AttendanceViewModel
            {
                GroupMembers = groupMembers.Members.ToList(),
                Date = DateTime.Today
            };
            
            return Ok(attendanceViewModel);
        }
        catch(Exception ex)
        {
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpPost]
    [Route("Status-Check")]
    public async Task<IActionResult> CheckAttendance([FromBody] AttendanceViewModel attendance)
    {
        try
        {
            var result = await _attendanceService.CheckAttendanceAsync(attendance.GroupId, attendance.Date, attendance.GroupMembers, attendance.AttendanceStatus);

            if (result)
            {
                return Ok("Attendance recorded successfully");
            }
            else
            {
                return StatusCode(500, "Failed to record attendance");
            }
        }
        catch (Exception ex)
        {
            
            return StatusCode(500, "Internal Server Error");
        }
    }

}

//TODO: NEED TO FIX POST ROUTE SO THAT I CAN INSERT MULTIPLE ATTENDANCE RECORDS FOR A MEMBER.
//TODO: NEED TO ALSO CHECK AND MAKE SURE I CAN LABEL THE ATTENDANCE RECORD BASED ON SERVICE[ MORNING SERVICE, AFTERNOON SERVICE, EVENING SERVICE, AND THIRD DAY SERVICE]