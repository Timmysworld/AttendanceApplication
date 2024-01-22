﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TheGospelMission.Data;

#nullable disable

namespace TheGospelMission.Migrations
{
    [DbContext(typeof(GospelMissionDbContext))]
    partial class GospelMissionDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("RoleId")
                        .HasColumnType("varchar(255)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Value")
                        .HasColumnType("longtext");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("TheGospelMission.Models.Attendance", b =>
                {
                    b.Property<int?>("AttendanceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateOnly>("AttendanceDate")
                        .HasColumnType("date");

                    b.Property<string>("AttendanceTime")
                        .IsRequired()
                        .HasColumnType("nvarchar(25)");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(25)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime");

                    b.HasKey("AttendanceId");

                    b.ToTable("Attendances");
                });

            modelBuilder.Entity("TheGospelMission.Models.Church", b =>
                {
                    b.Property<int?>("ChurchId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ChurchName")
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("ChurchId");

                    b.ToTable("Churches");

                    b.HasData(
                        new
                        {
                            ChurchId = 1,
                            ChurchName = "Colorado Springs Zion"
                        },
                        new
                        {
                            ChurchId = 2,
                            ChurchName = "San Diego Zion "
                        },
                        new
                        {
                            ChurchId = 3,
                            ChurchName = "Denver Zion"
                        },
                        new
                        {
                            ChurchId = 4,
                            ChurchName = "WheatRidge Zion"
                        },
                        new
                        {
                            ChurchId = 5,
                            ChurchName = "Los Angeles Zion"
                        });
                });

            modelBuilder.Entity("TheGospelMission.Models.Group", b =>
                {
                    b.Property<int?>("GroupId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime");

                    b.Property<string>("GroupLeaderUserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("GroupName")
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("UnitLeaderUserId")
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime");

                    b.HasKey("GroupId");

                    b.HasIndex("GroupLeaderUserId")
                        .IsUnique();

                    b.HasIndex("UnitLeaderUserId");

                    b.ToTable("Groups");

                    b.HasData(
                        new
                        {
                            GroupId = 1,
                            CreatedAt = new DateTime(2023, 12, 19, 15, 43, 43, 397, DateTimeKind.Local).AddTicks(3530),
                            GroupName = "Adult Brothers"
                        },
                        new
                        {
                            GroupId = 2,
                            CreatedAt = new DateTime(2023, 12, 19, 15, 43, 43, 397, DateTimeKind.Local).AddTicks(3600),
                            GroupName = "Adult Sisters"
                        },
                        new
                        {
                            GroupId = 3,
                            CreatedAt = new DateTime(2023, 12, 19, 15, 43, 43, 397, DateTimeKind.Local).AddTicks(3600),
                            GroupName = "Adult Spanish Brothers"
                        },
                        new
                        {
                            GroupId = 4,
                            CreatedAt = new DateTime(2023, 12, 19, 15, 43, 43, 397, DateTimeKind.Local).AddTicks(3600),
                            GroupName = "Adult Spanish Sisters"
                        },
                        new
                        {
                            GroupId = 5,
                            CreatedAt = new DateTime(2023, 12, 19, 15, 43, 43, 397, DateTimeKind.Local).AddTicks(3610),
                            GroupName = "Student Brothers"
                        },
                        new
                        {
                            GroupId = 6,
                            CreatedAt = new DateTime(2023, 12, 19, 15, 43, 43, 397, DateTimeKind.Local).AddTicks(3610),
                            GroupName = "Student Sisters"
                        });
                });

            modelBuilder.Entity("TheGospelMission.Models.Member", b =>
                {
                    b.Property<int?>("MemberId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("ChurchId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(255)");

                    b.Property<int?>("GroupId")
                        .HasColumnType("int");

                    b.Property<bool?>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime");

                    b.HasKey("MemberId");

                    b.HasIndex("ChurchId");

                    b.HasIndex("GroupId");

                    b.ToTable("Members");
                });

            modelBuilder.Entity("TheGospelMission.Models.MemberAttendance", b =>
                {
                    b.Property<int>("MemberAttendanceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AttendanceId")
                        .HasColumnType("int");

                    b.Property<int>("MemberId")
                        .HasColumnType("int");

                    b.HasKey("MemberAttendanceId");

                    b.HasIndex("AttendanceId");

                    b.HasIndex("MemberId");

                    b.ToTable("MemberAttendances");
                });

            modelBuilder.Entity("TheGospelMission.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<int?>("ChurchId")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(255)");

                    b.Property<int?>("GroupId")
                        .HasColumnType("int");

                    b.Property<bool?>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool?>("IsGroupLeader")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool?>("IsMember")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool?>("IsUnitLeader")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime?>("LastLoggedOn")
                        .HasColumnType("datetime");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(255)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("ChurchId");

                    b.HasIndex("GroupId");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("TheGospelMission.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("TheGospelMission.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TheGospelMission.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("TheGospelMission.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TheGospelMission.Models.Group", b =>
                {
                    b.HasOne("TheGospelMission.Models.User", "GroupLeader")
                        .WithOne("Group")
                        .HasForeignKey("TheGospelMission.Models.Group", "GroupLeaderUserId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("TheGospelMission.Models.User", "UnitLeader")
                        .WithMany()
                        .HasForeignKey("UnitLeaderUserId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("GroupLeader");

                    b.Navigation("UnitLeader");
                });

            modelBuilder.Entity("TheGospelMission.Models.Member", b =>
                {
                    b.HasOne("TheGospelMission.Models.Church", "Church")
                        .WithMany("Members")
                        .HasForeignKey("ChurchId");

                    b.HasOne("TheGospelMission.Models.Group", "Group")
                        .WithMany("Members")
                        .HasForeignKey("GroupId");

                    b.Navigation("Church");

                    b.Navigation("Group");
                });

            modelBuilder.Entity("TheGospelMission.Models.MemberAttendance", b =>
                {
                    b.HasOne("TheGospelMission.Models.Attendance", "Attendance")
                        .WithMany("MemberAttendances")
                        .HasForeignKey("AttendanceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TheGospelMission.Models.Member", "Member")
                        .WithMany("MemberAttendances")
                        .HasForeignKey("MemberId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Attendance");

                    b.Navigation("Member");
                });

            modelBuilder.Entity("TheGospelMission.Models.User", b =>
                {
                    b.HasOne("TheGospelMission.Models.Church", "Church")
                        .WithMany("Users")
                        .HasForeignKey("ChurchId");

                    b.HasOne("TheGospelMission.Models.Group", null)
                        .WithMany("Users")
                        .HasForeignKey("GroupId");

                    b.Navigation("Church");
                });

            modelBuilder.Entity("TheGospelMission.Models.Attendance", b =>
                {
                    b.Navigation("MemberAttendances");
                });

            modelBuilder.Entity("TheGospelMission.Models.Church", b =>
                {
                    b.Navigation("Members");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("TheGospelMission.Models.Group", b =>
                {
                    b.Navigation("Members");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("TheGospelMission.Models.Member", b =>
                {
                    b.Navigation("MemberAttendances");
                });

            modelBuilder.Entity("TheGospelMission.Models.User", b =>
                {
                    b.Navigation("Group");
                });
#pragma warning restore 612, 618
        }
    }
}
