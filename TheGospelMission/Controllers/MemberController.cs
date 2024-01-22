using System.Diagnostics;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheGospelMission.Data;
using TheGospelMission.Models;
using TheGospelMission.Services;

namespace TheGospelMission.Controllers;
    
[Route("api/[controller]")] //api/member
[ApiController]

public class MemberController : ControllerBase
{
        private readonly GospelMissionDbContext _context;
        // private readonly ChurchesService _churchesService;
        private readonly GroupServices _groupService;
        private readonly MemberServices _memberService;

        public MemberController(GospelMissionDbContext context, GroupServices groupService,MemberServices memberService)
        {
            _context = context;
           // _churchesService = churchesService;
            _groupService = groupService;
            _memberService = memberService;
        }

        //CREATE MEMBER
        /// <summary>
        /// Gets the FORM to CREATE a MEMBER
        /// </summary>
        /// 
        [HttpGet]
        public async Task<IActionResult> Create() 
        {
            var member = new Member();
            var group =  _groupService.GetGroups();
            
            return Ok();
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] Member member)
        {
            if(ModelState.IsValid)
            {
                await _memberService.CreateAsync(member);
                return Ok("Member created successfully");
            }
            // Log or inspect ModelState errors
            foreach (var error in ModelState.Values.SelectMany(v => v.Errors))
            {
                // Log or print the error message
                Console.WriteLine($"Validation Error: {error.ErrorMessage}");
            }

            return BadRequest(ModelState);
        }


        ///<summary>
        /// Gets a SPECIFIC MEMBER based on ID
        ///</summary>
        ///
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Details(int? id)
        {
            if(id == null || _context.Members == null)
            {
                return BadRequest("Member doesn't Exist!");
            }
            var member = await _context.Members
                .Include(m=> m.Church)
                .Include(m=>m.Group)
                .FirstOrDefaultAsync(m=>m.MemberId == id);
            if(member == null)
            {
                return NotFound();
            }

            return Ok(member);
        }

        ///<summary>
        /// EDIT the SPECIFIC MEMBER based on ID
        ///</summary>
        ///
        //TODO: DEBUG WHY DATABASE IS NOT UPDATING THE UPDATEDAT COLUMN.
        [HttpPost]
        [Route("{id}/edit")]
        public async Task<IActionResult> Edit(int? id, [FromBody] Member member)
        {

            if (id.HasValue && id != member.MemberId)
            {
                return NotFound();
            }
            if(ModelState.IsValid)
            {
                try
                {
                    member.UpdatedAt = DateTime.Now;
                    _context.Update(member);
                    await _context.SaveChangesAsync();
                }
                catch (System.Exception)
                {
                    if(!MemberExists(member.MemberId))
                    {
                        return NotFound();
                    }
                    throw;
                }
            }
            return Ok("Member Updated Successfully");
        }

        //DELETE/DEACTIVATE MEMBER
        ///<summary>
        /// ONLY ADMINSTRATION will be able to DELETE/DEACTIVATE a MEMBER
        ///</summary>
        ///
        [HttpDelete]
        [Route("{id}/delete")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Overseer")] 
        public async Task<IActionResult> Delete(int id)
        {
            var member = await _memberService.FindByIdAsync(id);

            if(member == null)
            {
                return NotFound();
            }

            _context.Members.Remove(member);
            await _context.SaveChangesAsync();

            return Ok("Member was Deleted Successfully");
        }

        [HttpPatch("{id}/deactivate")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Overseer")] 
        public async Task<IActionResult> Deactivate(int id)
        {
            var member = await _memberService.FindByIdAsync(id);

            if (member == null)
            {
                return NotFound();
            }

            member.IsActive = false; // Assuming you have an IsActive property in your Member model
            member.UpdatedAt = DateTime.Now; // Update the timestamp, if needed

            await _context.SaveChangesAsync();

            return Ok("Member Deactivated Successfully");
        }

        [HttpDelete("{memberId}/Remove/{groupId}")]
        public async Task<IActionResult> RemoveMemberFromGroup(int memberId, int groupId)
        {
            try
            {
                var member = await _memberService.FindByIdAsync(memberId);
                var group = await _groupService.FindAsync(groupId);

                if(member == null || group ==null)
                {
                    return NotFound();
                }

                member.GroupId = null;

                await _context.SaveChangesAsync();

                return Ok("Member removed from group successfully.");
            }
            catch (Exception ex)
            {
                
                // Log the exception or handle it as needed
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "An error occurred while processing the request.");
            }
        }



    private bool MemberExists(int? memberId)
    {
        throw new NotImplementedException();
    }



    
}