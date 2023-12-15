using TheGospelMission.Models;

namespace TheGospelMission.ViewModels;

public class AttendanceViewModel
{
    public int GroupId { get; set; }
    public DateTime Date { get; set; }
    public List<Member>? GroupMembers { get; set; }
    public string? AttendanceStatus { get; set; }
}