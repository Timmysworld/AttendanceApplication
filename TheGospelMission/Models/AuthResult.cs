namespace TheGospelMission.Models
{
    public class AuthResult
    {
        public string? Token {get; set;}
        public bool Result {get; set;}
        public List<string>? Errors {get; set;}

        public string? Status {get; set;}
        public string? Message {get;set;}

        public string? ExistingUsername { get; set; }
        
        public string? ExistingUserEmail { get; set; }

    }
}