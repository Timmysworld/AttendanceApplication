using TheGospelMission.Models;

namespace TheGospelMission.ViewModels;

public class AttendanceViewModel
{
    public int GroupId { get; set; }
    public DateOnly Date { get; set; }
    public string? Time {get; set;}
    public List<Member>? GroupMembers { get; set; }
    public string? AttendanceStatus { get; set; }
}