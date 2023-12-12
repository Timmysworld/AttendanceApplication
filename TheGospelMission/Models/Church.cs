using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TheGospelMission.Models
{
    public class Church
    {
        [Key] 
        public int? ChurchId { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string? ChurchName { get; set; }
        //public string Address { get; set; } 
        //public string City { get; set; }    
        //public string Region { get; set; }  
        //public string PostalCode { get; set; }
        //public string Country { get; set; }

        //Db Relationships

        public virtual ICollection<User>? Users { get; set; } = new List<User>();

        //one church can have many members
        
        public virtual ICollection<Member>? Members { get; set; } = new List<Member>(); // Initialize it as an empty list

        // public virtual ICollection<Group>? Groups { get; set; } =new List<Group>();
        // public virtual ICollection<Goal> Goals { get; set; } = new List<Goal>();
        public Church() { }
    }
}