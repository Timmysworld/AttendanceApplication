using Microsoft.EntityFrameworkCore;
using TheGospelMission.Data;
using TheGospelMission.Models;

namespace TheGospelMission.Services;

public class ChurchServices
{
    private readonly GospelMissionDbContext _context;

    public ChurchServices(GospelMissionDbContext context)
    {
        _context = context;
    }

    public List<Church> GetChurchesAsync()
    {
        return  _context.Churches.ToList();
    }
    public Church GetChurchByIdAsync(int ChurchId)
    {
        return _context.Churches.SingleOrDefault(c => c.ChurchId == ChurchId);
    }
}