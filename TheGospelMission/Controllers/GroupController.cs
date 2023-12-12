using Microsoft.AspNetCore.Mvc;
using TheGospelMission.Data;
using TheGospelMission.Services;

namespace TheGospelMission.Controllers;

public class GroupController : ControllerBase
{
    private readonly GospelMissionDbContext _context;
    private readonly GroupServices _groupService;
    private readonly MemberServices _memberService;

    public GroupController(GospelMissionDbContext context, GroupServices groupService,MemberServices memberService)
    {
        _context = context;
        _groupService = groupService;
        _memberService = memberService;
    }

    
}