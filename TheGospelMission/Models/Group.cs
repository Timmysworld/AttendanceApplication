using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TheGospelMission.Models
{
    public class Group
    {
        [Key]
        public int? GroupId { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string? GroupName { get; set; }


        [Column(TypeName = "datetime")]
        public DateTime? CreatedAt { get; set; } = DateTime.Now;

        [Column(TypeName = "datetime")]
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties to the leaders
        [ForeignKey("GroupLeaderUserId")]
        public virtual User? GroupLeader { get; set; }

        [ForeignKey("UnitLeaderUserId")]
        public virtual User? UnitLeader { get; set; }

        // Foreign keys
        public string? GroupLeaderUserId { get; set; }
        public string? UnitLeaderUserId { get; set; }

        public virtual ICollection<User>? Users { get; set; } = new List<User>();
        public virtual ICollection<Member>? Members { get; set; } = new List<Member>();

        public Group()
        {
            
        }
    }
}