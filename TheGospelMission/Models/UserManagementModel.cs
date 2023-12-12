namespace TheGospelMission.Models;

public class UserManagementModel
{
    public string? UserId { get; set; }
    public int GroupId { get; set; }
    public bool IsGroupLeader { get; set; }
    public bool IsUnitLeader { get; set; }
}
