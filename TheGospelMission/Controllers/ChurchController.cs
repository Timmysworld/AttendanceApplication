
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TheGospelMission.Models;
using TheGospelMission.Services;

namespace TheGospelMission.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChurchController : ControllerBase
{

    private readonly ILogger<ChurchController> _logger;
    private readonly ChurchServices _churchService;
    private readonly MemberServices _memberService;
    private readonly UserManager<User> _userManager;

    public ChurchController(ChurchServices churchService, MemberServices memberService, ILogger<ChurchController> logger, UserManager<User> userManager)
    {
        _churchService = churchService;
        _memberService = memberService;
        _userManager = userManager;
        _logger = logger;

        
    }

    [HttpGet("allChurches")]
    public IActionResult GetChurchNames()
    {
        var churchNames = _churchService.GetChurchesAsync(); 
        return Ok(churchNames);
    }

    [HttpGet("/{churchId}")]
    public IActionResult GetChurchById(int ChurchId)
    {
    
            if (ChurchId <= 0)
        {
            ModelState.AddModelError("churchId", "The churchId must be a positive integer.");
            return BadRequest(ModelState);
        }

        var church = _churchService.GetChurchByIdAsync(ChurchId);

        if (church != null)
        {
            return Ok(church);
        }
        else
        {
            return NotFound(); // or return an appropriate status code for not found
        }
    }

    //READ/UPDATE MEMBER 
    ///<summary>
    /// Gets the LIST of ALL MEMBERS stored in DATABASE
    ///</summary>
    ///

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Overseer")]
    [HttpGet]
    [Route("allMembers")]
    public async Task<IActionResult> GetAllMembers()
    {

        // Inspect HttpContext.User for debugging
        var user = HttpContext.User;
        var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        _logger.LogInformation($"Received token: {token}");

        if (user != null)

        {
            _logger.LogInformation($"User Information - Name: {user.Identity.Name}, IsAuthenticated: {user.Identity.IsAuthenticated}");

            // Log all claims for debugging
            foreach (var claim in user.Claims)
            {
                _logger.LogInformation($"Claim Type: {claim.Type}, Claim Value: {claim.Value}");
            }

            // Check if ChurchId claim exists and is not null or empty
            var churchIdClaim = user.FindFirst("ChurchId");
            if (churchIdClaim == null || string.IsNullOrEmpty(churchIdClaim.Value))
            {
                // Log the issue for debugging
                _logger.LogError("Invalid or missing ChurchId claim. User: {UserName}");

                // Handle the case where ChurchId is null or empty
                // You might want to return an error or handle this case as needed
                return BadRequest(new { message = "Invalid or missing ChurchId claim." });
            }

            // Use the extracted ChurchId directly in your service method
            var currentUserChurchId = churchIdClaim.Value;

            try
            {
                // Now you can use currentUserChurchId in your service method
                var members = await _memberService.GetMembersAsync(currentUserChurchId);

                return Ok(members);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving members for ChurchId {ChurchId}. User: {UserName}", currentUserChurchId, user.Identity.Name);
                return StatusCode(500, "Internal Server Error");
            }
        }
        else
        {
            // Log an error or handle the case where the user object is null
            _logger.LogError("HttpContext.User is null.");
            return BadRequest(new { message = "Invalid or missing user information." });
        }
    }

}
