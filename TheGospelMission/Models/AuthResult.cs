namespace TheGospelMission.Models
{
    public class AuthResult
    {
        public string? Token {get; set;}
        public bool Result {get; set;}
        public List<string>? Errors {get; set;}

        public string? Status {get; set;}
        public string? Message {get;set;}

         // Add ExistingUsername property
        public string? ExistingUsername { get; set; }
         // Add ExistingUsername property
        public string? ExistingUserEmail { get; set; }

    }
}