using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskBoard.Infrastructure.Data;
using TaskBoard.API.Models;
namespace TaskBoard.API.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly AppDbContext _context;

    public AdminController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("dashboard")]
    public IActionResult Dashboard()
    {
        return Ok(new
        {
            totalUsers = _context.Users.Count(),
            totalTasks = _context.Tasks.Count(),
            todo = _context.Tasks.Count(t => t.Status == "ToDo"),
            inProgress = _context.Tasks.Count(t => t.Status == "InProgress"),
            done = _context.Tasks.Count(t => t.Status == "Done")
        });
    }

    [HttpGet("tasks")]
    public IActionResult GetAllTasks()
    {
        return Ok(_context.Tasks.ToList());
    }

    [HttpGet("users")]
    public IActionResult GetUsers()
    {
        return Ok(_context.Users.ToList());
    }

    [HttpDelete("users/{id}")]
    public IActionResult DeleteUser(int id)
    {
        var user = _context.Users.Find(id);

        if (user == null)
            return NotFound();

        var tasks = _context.Tasks.Where(t => t.UserId == id).ToList();
        _context.Tasks.RemoveRange(tasks);

        _context.Users.Remove(user);
        _context.SaveChanges();

        return Ok(new { message = "User deleted successfully" });
    }
    [HttpPut("users/{id}/role")]
    public IActionResult UpdateUserRole(int id, [FromBody] UpdateRoleDto dto)
    {
        var user = _context.Users.Find(id);

        if (user == null)
            return NotFound("User not found");

        if (dto == null || string.IsNullOrEmpty(dto.Role))
            return BadRequest("Role is required");

        user.Role = dto.Role;
        _context.SaveChanges();

        return Ok(new { message = "Role updated successfully" });
    }
}