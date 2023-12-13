using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheGospelMission.Data;
using TheGospelMission.Models;
using TheGospelMission.ViewModels;

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

        public async Task<UserProfileModel> GetUserAsync(ClaimsPrincipal userPrincipal)
        {
            var userId = _userManager.GetUserId(userPrincipal);
            var user = await _userManager.FindByIdAsync(userId);
            if(user == null)
            {
                return null;
            }
            var profile = new UserProfileModel
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName

            };

            return profile;
        }

        public async Task<IActionResult> UpdateUserProfileAsync(UserProfileModel profile)
        {
            try
            {

                var currentUserProfile = await _context.Users
                    .FirstOrDefaultAsync(u => u.Id == profile.Id);

                _logger.LogInformation($"Updating user profile with ID: {profile.Id}");
                if (currentUserProfile == null)
                {
                    return new NotFoundObjectResult("User profile not found");
                }

                currentUserProfile.UserName = profile.UserName;
                currentUserProfile.Email = profile.Email;
                currentUserProfile.FirstName = profile.FirstName;
                currentUserProfile.LastName = profile.LastName;

                await _context.SaveChangesAsync();

                return new OkObjectResult("User Updated Successfully");
            }
            catch (Exception ex)
            {
                // Log the exception if needed
                return new ObjectResult("An error occurred while processing your request.")
                {
                    StatusCode = 500
                };
            }
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


}