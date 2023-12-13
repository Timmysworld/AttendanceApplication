using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace TheGospelMission.Models;

public class User : IdentityUser
{
    
    [PersonalData]
    [Column(TypeName = "nvarchar(255)")]
    public string? FirstName {get; set;}

    [PersonalData]
    [Column(TypeName = "nvarchar(255)")]
    public string? LastName { get; set; }

    [PersonalData]
    [Column(TypeName = "nvarchar(255)")]
    public string? Gender { get; set; }

    [Column(TypeName = "boolean")]
    public bool? IsActive {get; set;} = true; 

    [Column(TypeName = "datetime")]
    public DateTime? LastLogIn {get;set;}

    [Column(TypeName = "boolean")]
    public bool? IsMember{get; set;} = true;

    public int? GroupId { get; set; } // Foreign Key to Group
    public bool? IsGroupLeader {get; set;}
    public bool? IsUnitLeader { get; set; }

    public virtual Group? Group { get; set; } // Navigation property

    public int? ChurchId { get; set; }   
    public virtual Church? Church { get; set; }

}