using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TheGospelMission.Models
{
    public class Attendance
    {
        [Key]
        public int? AttendanceId { get; set; }

        [Column(TypeName = "nvarchar(25)")]
        public string? Status { get; set; }
        
        [Column(TypeName = "datetime")]
        public DateTime? AttendanceDate { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? AttendanceTime { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? CreatedAt { get; set; } = DateTime.Now;

        [Column(TypeName = "datetime")]
        public DateTime? UpdatedAt { get; set; }

        public virtual ICollection<MemberAttendance>? MemberAttendances { get; set; }
        public Attendance() { }
    }
}