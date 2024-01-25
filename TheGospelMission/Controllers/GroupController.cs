using Microsoft.AspNetCore.Mvc;
using TheGospelMission.Data;
using TheGospelMission.Services;

namespace TheGospelMission.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GroupController : ControllerBase
{
    private readonly GospelMissionDbContext _context;
    private readonly GroupServices _groupService;
    private readonly MemberServices _memberService;
    private readonly ILogger<GroupController> _logger;

    public GroupController(GospelMissionDbContext context, GroupServices groupService,MemberServices memberService, ILogger<GroupController> logger)
    {
        _context = context;
        _groupService = groupService;
        _memberService = memberService;
        _logger = logger;
    }

    [HttpGet("allGroups")]
    public IActionResult GetGroup()
    {
        try
    {
        var groupNames = _groupService.GetGroups();
        return Ok(groupNames);
    }
    catch (Exception ex)
    {
        _logger.LogError($"Error fetching group names: {ex.Message}");
        return StatusCode(500, "Internal Server Error");
    }
    }
}