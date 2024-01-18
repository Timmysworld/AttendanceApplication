using TheGospelMission.Models;

namespace TheGospelMission.ViewModels;

public class UserProfileModel
{
    public string? Id { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Gender { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? LastLoggedOn { get; set; }
        public Group? Group { get; set; }
        public List<string>? Roles { get; set; }
}