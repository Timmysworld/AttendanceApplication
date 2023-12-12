using TheGospelMission.Models;

namespace TheGospelMission.Services;
public class NotificationService
{
    private readonly List<Notification> _notifications = new List<Notification>();
    
    public IEnumerable<Notification>GetUserNotifications(string userId)
    {
        return _notifications.Where(n => !n.IsRead);
    }
    public IEnumerable<Notification> GetAdminNotifications()
    {
        return _notifications.Where(n => !n.IsRead && (n.UserId == null || n.UserId == "OverSeer"));
    }


    public void AddNotification(string message, string? userId = null)
    {
        var notification = new Notification
        {
            UserId = userId,
            Message = message,
            CreatedAt = DateTime.Now,
            IsRead = false
        };
        _notifications.Add(notification);
    }

    public void MarkNotificationAsRead(string? userId, int notificationId)
    {
        var notification = _notifications.FirstOrDefault(n => n.Id == notificationId && n.UserId == userId);

        if (notification != null)
        {
            notification.IsRead = true;
        }
    }
}