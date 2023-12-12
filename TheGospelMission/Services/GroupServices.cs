using Microsoft.EntityFrameworkCore;
using TheGospelMission.Data;
using Group = TheGospelMission.Models.Group;

namespace TheGospelMission.Services;

public class GroupServices(GospelMissionDbContext context, ILogger<GroupServices> logger)
{
        private readonly GospelMissionDbContext _context = context;
        private readonly ILogger<GroupServices> _logger = logger;

        //TOTAL NUMBER OF GROUPS
        public async Task<int>TotalGroupsCountAsync()
        {
            return await _context.Groups.CountAsync();
        }

        //LIST OF ALL GROUPS
        public List<Group> GetGroups()
        {
            return _context.Groups.ToList();
        }

        public async Task<Group> FindAsync(int groupId)
        {
            return await _context.Groups.FindAsync(groupId);
        }
}

