namespace TaskBoard.API.Models;

public class SignupDto
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    public string Role { get; set; } = "User";
}