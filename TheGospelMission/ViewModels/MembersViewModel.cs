using TheGospelMission.Models;

namespace TheGospelMission.ViewModels;

public class MembersViewModel
{
    public int? Id {get; set;}
    public string? FirstName { get; set; } =string.Empty;
    public string? LastName { get; set; } =string.Empty;
    public string? Gender { get; set; } = string.Empty;
    public bool? IsActive {get; set;} = true; 
    public GroupViewModel? Group { get; set; }
    public ChurchViewModel? Church { get; set; }

}