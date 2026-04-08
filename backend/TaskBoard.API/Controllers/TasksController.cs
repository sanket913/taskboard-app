using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskBoard.Infrastructure.Data;
using TaskBoard.Domain.Entities;
using System.Security.Claims;
using TaskBoard.API.Models;

namespace TaskBoard.API.Controllers;

[ApiController]
[Route("api/tasks")]
[Authorize]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    private int GetUserId()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId == null)
            throw new Exception("UserId not found in token");

        return int.Parse(userId);
    }

    [HttpPost]
    public IActionResult Create(TaskItem task)
    {
        task.UserId = GetUserId();
        _context.Tasks.Add(task);
        _context.SaveChanges();
        return Ok(task);
    }

    [HttpGet]
    public IActionResult GetMyTasks()
    {
        var userId = GetUserId();
        return Ok(_context.Tasks.Where(t => t.UserId == userId).ToList());
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, TaskItem updated)
    {
        var task = _context.Tasks.Find(id);
        if (task == null || task.UserId != GetUserId())
            return Unauthorized();

        task.Title = updated.Title;
        task.Description = updated.Description;
        task.Status = updated.Status;

        _context.SaveChanges();
        return Ok(task);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var task = _context.Tasks.Find(id);
        if (task == null)
            return NotFound();

        var userId = GetUserId();
        var role = User.FindFirst(ClaimTypes.Role)?.Value;

        
        if (task.UserId != userId && role != "Admin")
            return Unauthorized();

        _context.Tasks.Remove(task);
        _context.SaveChanges();

        return Ok();
    }
    [HttpPut("users/{id}/role")]
public IActionResult UpdateUserRole(int id, [FromBody] UpdateRoleDto dto)
{
    try
    {
        var user = _context.Users.Find(id);

        if (user == null)
            return NotFound("User not found");

        if (dto == null || string.IsNullOrEmpty(dto.Role))
            return BadRequest("Role is missing");

        user.Role = dto.Role;
        _context.SaveChanges();

        return Ok(new { message = "Role updated successfully" });
    }
    catch (Exception ex)
    {
        return BadRequest(ex.Message);
    }
}
}