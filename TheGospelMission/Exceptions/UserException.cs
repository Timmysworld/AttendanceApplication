namespace TheGospelMission.Exceptions;

public class UserException : Exception
{
    public UserException() { }

        public UserException(string message) : base(message) { }

        public UserException(string message, Exception innerException) : base(message, innerException) { }
}

internal class UserExistsException : UserException
{
    // Additional properties specific to UserExistsException
        public string ExistingUsername { get;  set; }
        public string ExistingUserEmail { get;  set; }

        // Custom constructor to set additional properties
        public UserExistsException(string existingUsername, string existingUserEmail)
            : base("User already exist. Did you forget your password?") //$"User with username '{existingUsername}' and Email '{existingUserEmail}' already exists."
        {
            ExistingUsername = existingUsername;
            ExistingUserEmail = existingUserEmail;
        }
}

internal class UserNotFoundException : UserException
    {
        // Additional properties or methods specific to UserNotFoundException
        public string MissingUsername { get; private set; }
        public string MissingUserEmail {get; private set;}

        public UserNotFoundException(string missingUsername)
        : base($"User with username '{missingUsername}' not found.")
        {
            MissingUsername = missingUsername;
        }
    }