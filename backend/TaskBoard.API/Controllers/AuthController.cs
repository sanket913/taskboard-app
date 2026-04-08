using Microsoft.AspNetCore.Mvc;
using TaskBoard.Infrastructure.Data;
using TaskBoard.Domain.Entities;
using TaskBoard.API.Services;
using TaskBoard.API.Models;

namespace TaskBoard.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly JwtService _jwt;

    public AuthController(AppDbContext context, JwtService jwt)
    {
        _context = context;
        _jwt = jwt;
    }

    // SIGNUP
    [HttpPost("signup")]
    public IActionResult Signup([FromBody] SignupDto dto)
    {
        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),

            
            Role = string.IsNullOrEmpty(dto.Role) ? "User" : dto.Role
        };

        _context.Users.Add(user);
        _context.SaveChanges();

        return Ok(new { message = "User Created" });
    }

    // LOGIN
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto dto)
    {
        var user = _context.Users.FirstOrDefault(x => x.Email == dto.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Unauthorized(new { message = "Invalid email or password" });

        var token = _jwt.GenerateToken(user);

        
        return Ok(new
        {
            token = token,
            role = user.Role,
            userId = user.Id
        });
    }
}