namespace TheGospelMission.Exceptions;

public class MemberException : Exception
{
    public MemberException(){}

    public MemberException(string message) : base(message) {}
    public MemberException(string message, Exception innerException) : base(message, innerException){}

}

internal class MemberExistException : MemberException
{
    public string ExistingMemberFirstName {get; set;}
    public string ExistingMemberLastName {get; set;}


    public MemberExistException(string existingMemberFirstName, string existingMemberLastName)
        :base($"Member with the name {existingMemberFirstName} {existingMemberLastName} already exists.")
        {
            ExistingMemberFirstName = existingMemberFirstName;
            ExistingMemberLastName = existingMemberLastName;
        }
}