using Microsoft.EntityFrameworkCore;
using TheGospelMission.Data;
using TheGospelMission.Models;

namespace TheGospelMission.Services
{
    public class MemberServices
    {
        private readonly GospelMissionDbContext _context;
        private readonly ILogger<MemberServices> _logger;

        public MemberServices(GospelMissionDbContext context, ILogger<MemberServices> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        // TOTAL NUMBER OF MEMBERS
        public async Task<int> TotalMembersCountAsync()
        {
            return await _context.Members.CountAsync();
        }

        // LIST OF ALL MEMBERS
        public async Task<List<Member>> GetMembersAsync()
        {
            return await _context.Members.ToListAsync();
        }

        //CREATE MEMBER
        public async Task CreateAsync(Member member)
        {
            await _context.AddAsync(member);
            await _context.SaveChangesAsync();
        }

        public async  Task<Member> FindByIdAsync(int memberId)
        {
            return await _context.Members.FindAsync(memberId);
        }
    }
}
