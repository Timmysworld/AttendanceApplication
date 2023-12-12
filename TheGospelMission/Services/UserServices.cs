using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TheGospelMission.Data;
using TheGospelMission.Models;

namespace TheGospelMission.Services;
public class UserServices
{
    private readonly GospelMissionDbContext _context;
    private readonly ILogger<UserServices> _logger;
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    public UserServices(GospelMissionDbContext context, ILogger<UserServices> logger, UserManager<User> user, RoleManager<IdentityRole> roleManager)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _userManager = user ?? throw new ArgumentNullException(nameof(user));
        _roleManager = roleManager;
    }

    // TOTAL NUMBER OF MEMBERS
        public async Task<int> TotalUserCountAsync()
        {
            return await _context.Users.CountAsync();
        }

    // LIST OF ALL MEMBERS
        public async Task<List<User>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

    //ASSIGN USERS TO GROUP 
        public async Task AssignGroup(string userId, int groupId, bool IsGroupLeader, bool IsUnitLeader)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId);
                var group = await _context.Groups.FindAsync(groupId);

                if(user == null || group == null)
                {
                    // Handle the case where the user or group is not found
                    return;
                }
                user.GroupId = groupId;
                await _userManager.UpdateAsync(user);


                if(IsGroupLeader)
                {
                    user.IsGroupLeader = true;
                    group.GroupLeaderUserId = userId;
                    await AssignRole(user, "GroupLeader");
                }
                else if(IsUnitLeader)
                {
                    user.IsUnitLeader = true;
                    group.UnitLeaderUserId = userId;
                    await AssignRole(user, "UnitLeader");
                }
                else 
                {
                    group.GroupLeaderUserId = null;
                    group.UnitLeaderUserId = null;
                }
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                
                throw;
            }
        }
        //TODO: I NEED A CASE TO WHERE IF YOU CHANGE THE ROLE OF A USER THE PREVIOUS BOOLEAN(ISROLE) IS REMOVE

    //ASSIGN USERS A Role
        private async Task AssignRole(User user, string roleName)
        {
            // Log or debug statement to confirm method execution
            Console.WriteLine($"AssignRole method called for user {user.UserName} with role {roleName}");
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                // Create the role if it doesn't exist
                await _roleManager.CreateAsync(new IdentityRole(roleName));
            }

            await _userManager.AddToRoleAsync(user, roleName);
        }

        //TODO: I NEED AN UPDATE/EDIT AND DELETE/DEACTIVATE USER INFORMATION

}