namespace TheGospelMission.Models
{
    public class MemberAttendance
    {
        public int MemberAttendanceId { get; set; }

        public int AttendanceId { get; set; } 
        public virtual Attendance? Attendance { get; set; }

        public int MemberId { get; set; }
        public virtual Member? Member { get; set; }
    }
}
