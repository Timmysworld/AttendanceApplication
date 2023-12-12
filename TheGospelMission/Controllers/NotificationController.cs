using Microsoft.AspNetCore.Mvc;
using TheGospelMission.Services;

namespace TheGospelMission.Controllers;
[Route("api/[controller]")] // api/notification
[ApiController]
public class NotificationController: ControllerBase
{
    private readonly NotificationService _notificationService;

    public NotificationController(NotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    [HttpGet]
    [Route("user-notifications")]
    public IActionResult GetUserNotifications()
    {
        var notifications = _notificationService.GetUserNotifications(User.Identity.Name);
        return Ok(notifications);
    }
    [HttpGet("admin-notifications")]
    public IActionResult GetAdminNotifications()
    {
        var adminNotifications = _notificationService.GetAdminNotifications();
        return Ok(adminNotifications);
    }
    [HttpPost("read/{notificationId}")]
    public IActionResult MarkNotificationAsRead(int notificationId)
    {
        var isOverSeer = User.IsInRole("OverSeer"); // Adjust based on your role-checking logic

        if (isOverSeer)
        {
            _notificationService.MarkNotificationAsRead(null, notificationId);
            return Ok("Admin notification marked as read.");
        }
        else
        {
            _notificationService.MarkNotificationAsRead(User.Identity.Name, notificationId);
            return Ok("User notification marked as read.");
        }
    }

}
