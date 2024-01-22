using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TheGospelMission.Data;
using TheGospelMission.Exceptions;
using TheGospelMission.Models;
using TheGospelMission.ViewModels;

namespace TheGospelMission.Services
{
    public class MemberServices
    {
        private readonly GospelMissionDbContext _context;
        private readonly ILogger<MemberServices> _logger;
        private readonly UserManager<User> _userManager;

        public MemberServices(GospelMissionDbContext context, ILogger<MemberServices> logger,  UserManager<User> userManager)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
        }

        // TOTAL NUMBER OF MEMBERS
        public async Task<int> TotalMembersCountAsync()
        {
            return await _context.Members.CountAsync();
        }

        // LIST OF ALL MEMBERS
        public async Task<List<MembersViewModel>> GetMembersAsync(string churchId)
        {
            
            var members = await _context.Members
                .Include(m => m.Church)
                .Include(m =>m.Group)
                .Where(m => m.ChurchId.ToString() == churchId)
                .ToListAsync();

            var simplifiedMembers = members.Select(members => new MembersViewModel
            {
                Id = members.MemberId,
                FirstName = members.FirstName,
                LastName = members.LastName,
                Gender = members.Gender,
                IsActive = members.IsActive,
                Group = new GroupViewModel
                {
                    GroupName = members.Group?.GroupName ?? "unassigned"
                    // Add other properties as needed
                },
                Church = new ChurchViewModel
                {
                    ChurchName = members.Church?.ChurchName ?? "unassigned"
                    // Add other properties as needed
                }
            }).ToList();
            return simplifiedMembers;
        }

        //CREATE MEMBER
        public async Task CreateAsync(Member member)
        {
            bool isExistingMember = await _context.Members.AnyAsync(m=> m.FirstName == member.FirstName);
            if (isExistingMember)
            {
                // Get the existing member's last name from the database
                string existingMemberLastName = await _context.Members
                    .Where(m => m.FirstName == member.FirstName)
                    .Select(m => m.LastName)
                    .FirstOrDefaultAsync()?? "DefaultLastName";

                // Check if the last names match
                if (existingMemberLastName == member.LastName)
                {
                    // Last names match, throw exception
                    throw new MemberExistException(member.FirstName, member.LastName);
                }
                // Last names don't match, proceed with creating the member
            }
            await _context.AddAsync(member);
            await _context.SaveChangesAsync();
        }

        //FIND MEMBER
        public async  Task<Member> FindByIdAsync(int? memberId)
        {
            return await _context.Members.FindAsync(memberId);
        }

        // GET MEMBERS ATTENDANCE HISTORY
        public async Task<List<MemberAttendance>> AttendanceHistory(int memberId)
        {
            var result = await _context.MemberAttendances
                    .Where(ma => ma.MemberId == memberId)
                    .Include(ma => ma.Attendance)
                    .ToListAsync();

            return result;
        }
    }
}
