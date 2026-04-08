namespace TaskBoard.Domain.Entities;

public class User
{
    public int Id { get; set; }              // Primary Key

    public string Name { get; set; }         // User ka naam

    public string Email { get; set; }        // Login ke liye

    public string PasswordHash { get; set; } // Hashed password (plain nahi)

    public string Role { get; set; } = "User"; // Default role

    public ICollection<TaskItem> Tasks { get; set; } // Relation
}