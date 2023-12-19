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

    public async Task<bool> CheckAttendanceAsync(int groupId,DateOnly selectedDate, string time, List<Member> groupMembers, string attendanceStatus)
    {
        try
        {
            if (groupMembers == null || groupMembers.Count == 0)
            {
                // Handle the case where groupMembers is null or empty
                return false;
            }

            foreach (var member in groupMembers)
            {
                // Check if there is an existing attendance record for the selected date
                var attendanceRecord = await _context.Attendances
                    .FirstOrDefaultAsync(a => a.AttendanceDate == selectedDate && a.AttendanceTime == time);
                
                if(attendanceRecord == null)
                {
                    attendanceRecord = new Attendance
                    {
                        AttendanceDate = selectedDate,
                        Status = attendanceStatus,
                        AttendanceTime = GetTimeLabel(DateTime.Now),
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

    public async Task<Attendance> FindByIdAsync(int? attendanceId)
    {
        
        return await _context.MemberAttendances
            .Where(ma => ma.AttendanceId == attendanceId)
            .Select(ma => ma.Attendance)
            .FirstOrDefaultAsync();
    }

    public async Task UpdateAttendance(Attendance attendance)
    {
        _context.Attendances.Update(attendance);
        await _context.SaveChangesAsync();
    }

    public async Task SaveChangesAsync()
    {
        // Save changes to the database
        await _context.SaveChangesAsync();
    }


    //HELPER METHOD TO GET THE TIME AS LABELS
//TODO: NEED TO FIX LOGIC SO THAT IF THE DAY IS TUESDAY IT RESULTS IN SAYING THIRD DAY SERVICE FOR ATTENDANCE TIME
    private static string GetTimeLabel(DateTime time)
    {
        // Log the day of the week for debugging
    Console.WriteLine($"Day of the week: {time.DayOfWeek}");

        if (time.DayOfWeek == DayOfWeek.Tuesday)
        {
            return "Third Day Service";
        }
        int hour = time.Hour;

        switch (hour)
        {
            case int h when (h >= 0 && h < 12):
                return "Morning Service";
            case int h when (h >= 12 && h < 17):
                return "Afternoon Service";
            case int h when (h >= 17 && h < 21): 
                return "Evening Service";
            default:
                return null;
        }

    }
}