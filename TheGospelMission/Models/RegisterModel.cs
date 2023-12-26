using System.ComponentModel.DataAnnotations;

namespace TheGospelMission.Models
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Username is required")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "First Name is required")]
        public string? FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required")]
        public string? LastName { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }

        [Required, Compare("Password")]
        public string? ConfirmPassword {get; set;}

        [Required(ErrorMessage = "Please select one")]
        public string? Gender {get;set;}

        [Required(ErrorMessage = "Please select a church")]
        public int? Church {get; set;}
    }
}