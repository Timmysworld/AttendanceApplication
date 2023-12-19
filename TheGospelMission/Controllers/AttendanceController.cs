using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheGospelMission.Data;
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
    private readonly MemberServices _memberService;
    public AttendanceController(UserManager<User> userManager, GroupServices groupServices, AttendanceServices attendanceService, MemberServices  memberServices)
    {
        _userManager = userManager;
        _groupService = groupServices;
        _attendanceService = attendanceService;
        _memberService = memberServices;
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
                Date = DateOnly.FromDateTime(DateTime.Now)
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
            var result = await _attendanceService.CheckAttendanceAsync(attendance.GroupId, attendance.Date, attendance.Time, attendance.GroupMembers, attendance.AttendanceStatus);

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
            
            return StatusCode(500,ex.Message);
        }
    }

    [HttpGet]
    [Route("{memberId}/all")]
    public async Task<IActionResult> MemberAttendance(int memberId)
    {
        try
        {
            var member = await _memberService.FindByIdAsync(memberId);
            if (member == null)
            {
                return NotFound();
            }
            var records = await _memberService.AttendanceHistory(memberId);
            if(records == null)
            {
                return NotFound("Attendance Records not found for member.");
            }


            return Ok(records);
        }
        catch(Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost]
    [Route("{memberId}/{attendanceId}/edit")]
    public async Task<IActionResult> MemberAttendance(int? memberId, int? attendanceId, [FromBody] AttendanceViewModel attendanceViewModel)
    {
        // Check if ModelState is valid
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Check if memberId is valid
        if (memberId == null)
        {
            return BadRequest("Invalid memberId.");
        }

        // Check if the member exists
        var member = await _memberService.FindByIdAsync(memberId);
        if (member == null)
        {
            return NotFound("Member not found.");
        }

        try
        {
            // Check if attendanceId is valid
            if (attendanceId == null)
            {
                return BadRequest("Invalid attendanceId.");
            }

            // Find the existing attendance record
            var existingAttendance = await _attendanceService.FindByIdAsync(attendanceId);
            if (existingAttendance == null)
            {
                return NotFound("Attendance record not found for the specified attendanceId.");
            }

            // Map properties from ViewModel to Entity
            if (existingAttendance.Status != attendanceViewModel.AttendanceStatus)
            {
                existingAttendance.Status = attendanceViewModel.AttendanceStatus;
            }

            // Set the UpdatedAt property
            existingAttendance.UpdatedAt = DateTime.Now;

            // Save changes to the database
            await _attendanceService.SaveChangesAsync();

            // Return a successful response
            return Ok("Attendance record updated successfully");
        }
        catch (Exception ex)
        {
            // Handle exceptions and return an appropriate response
            return StatusCode(500, ex.Message);
        }
    }

}
