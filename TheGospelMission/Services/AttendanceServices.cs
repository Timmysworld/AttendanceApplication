using Microsoft.EntityFrameworkCore;
using TheGospelMission.Data;
using TheGospelMission.Models;

namespace TheGospelMission.Services;
public class AttendanceServices
{
    private readonly GospelMissionDbContext _context;
    private readonly ILogger<AttendanceServices> _logger;

    public AttendanceServices(ILogger<AttendanceServices> logger, GospelMissionDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<bool> CheckAttendanceAsync(int groupId, DateTime selectedDate, List<Member> groupMembers, string attendanceStatus)
    {
        try
        {
            if (groupMembers == null || !groupMembers.Any())
            {
                // Handle the case where groupMembers is null or empty
                return false;
            }

            foreach (var member in groupMembers)
            {
                // Check if there is an existing attendance record for the selected date
                var attendanceRecord = await _context.Attendances
                    .FirstOrDefaultAsync(a => a.AttendanceDate == selectedDate);
                
                if(attendanceRecord == null)
                {
                    attendanceRecord = new Attendance
                    {
                        AttendanceDate = selectedDate,
                        Status = attendanceStatus,
                        AttendanceTime = DateTime.Now,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = null
                    };
                    _context.Attendances.Add(attendanceRecord);
                    await _context.SaveChangesAsync();
                }

                if(member != null && member.MemberId.HasValue)
                {
                    // Create the MemberAttendance record
                    var memberAttendanceRecord = new MemberAttendance
                    {

                        AttendanceId = (int)attendanceRecord.AttendanceId,
                        MemberId = member.MemberId.Value
                    };

                        // Add the MemberAttendance record to the context
                    _context.MemberAttendances.Add(memberAttendanceRecord);
                }
                else
                {
                    _logger.LogError("Null member or member.MemberId encountered while processing attendance.");
                }
            }
            await _context.SaveChangesAsync();
            return true;
        }
        catch (System.Exception)
        {
            throw;
        }
    }
}