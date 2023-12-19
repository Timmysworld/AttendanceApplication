
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TheGospelMission.Models;


namespace TheGospelMission.Data;

public class GospelMissionDbContext : IdentityDbContext<User>
{
    public GospelMissionDbContext(DbContextOptions<GospelMissionDbContext> options)
        : base(options)
    {
    }
    public DbSet<Church>? Churches { get; set; }
    public DbSet<Attendance>? Attendances { get; set; }
    public DbSet<Member>? Members { get; set; }
    public DbSet<Group>? Groups { get; set; }

    // public DbSet<Goal>?Goals { get; set; }
    public DbSet<MemberAttendance>? MemberAttendances { get; set; }

    protected override void OnModelCreating(ModelBuilder Builder)
    {
        base.OnModelCreating(Builder);
        // Customize the ASP.NET Identity model and override the defaults if needed.
        // For example, you can rename the ASP.NET Identity table names and more.
        // Add your customizations after calling base.OnModelCreating(builder);

        Builder.Entity<Group>()
            .HasOne(g => g.GroupLeader)
            .WithOne(u => u.Group)
            .HasForeignKey<Group>(g => g.GroupLeaderUserId)
            .OnDelete(DeleteBehavior.Restrict); // Optional: restrict deletion if the user is a group leader

        Builder.Entity<Group>()
            .HasOne(g => g.UnitLeader)
            .WithMany()
            .HasForeignKey(g => g.UnitLeaderUserId)
            .OnDelete(DeleteBehavior.Restrict); // Optional: restrict deletion if the user is a unit leader

        Builder.Entity<Group>().HasData(
            new Group { GroupId = 1, GroupName = "Adult Brothers"},
            new Group { GroupId = 2, GroupName = "Adult Sisters" },
            new Group { GroupId = 3, GroupName = "Adult Spanish Brothers" },
            new Group { GroupId = 4, GroupName = "Adult Spanish Sisters" },
            new Group { GroupId = 5, GroupName = "Student Brothers" },
            new Group { GroupId = 6, GroupName = "Student Sisters" }
            );

        Builder.Entity<Church>().HasData(
            new Church { ChurchId = 1, ChurchName = "Colorado Springs Zion" },
            new Church { ChurchId = 2, ChurchName = "San Diego Zion " },
            new Church { ChurchId = 3, ChurchName = "Denver Zion" },
            new Church { ChurchId = 4, ChurchName = "WheatRidge Zion" },
            new Church { ChurchId = 5, ChurchName = "Los Angeles Zion" }
            );

    }
}
