using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TaskBoard.Domain.Entities;

public class TaskItem
{
    public int Id { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    [Required]
    public string Status { get; set; } = "ToDo"; // ToDo, InProgress, Done

    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    public int UserId { get; set; }

    // Prevents 400 error + circular JSON issues
    [JsonIgnore]
    public User? User { get; set; }
}