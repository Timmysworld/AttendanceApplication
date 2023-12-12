using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace TheGospelMission.Models
{
    public class Member
    {
        [Key]
        public int? MemberId { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string? FirstName { get; set; } =string.Empty;

        [Column(TypeName = "nvarchar(255)")]
        public string? LastName { get; set;} = string.Empty;

        [Column(TypeName = "nvarchar(255)")]
        public string? Gender { get; set; } = string.Empty;

        [Column(TypeName = "datetime")]
        public DateTime? CreatedAt { get; set; } = DateTime.Now;

        [Column(TypeName = "datetime")]
        public DateTime? UpdatedAt { get; set; }

        [Column(TypeName = "boolean")]
        public bool? IsActive {get; set;} = true; 



        //DB Relationships one-to-one 

        // Foreign keys and navigation properties
        [ForeignKey("GroupId")]
        public int? GroupId { get; set; }
        //[JsonIgnore]
        public virtual Group? Group { get; set; }

        [ForeignKey("ChurchId")]
        public int? ChurchId { get; set; }
        public virtual Church? Church { get; set; }

        //one-to-many
        public virtual ICollection<MemberAttendance>? MemberAttendances { get; set; }

        public Member() { }

    }
}