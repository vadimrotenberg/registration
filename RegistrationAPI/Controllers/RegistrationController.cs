using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegistrationAPI.Data;
using RegistrationAPI.ViewModels;

namespace RegistrationAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RegistrationController : ControllerBase
{
    private readonly RegistrationDataContext _dataContext;

    public RegistrationController(RegistrationDataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet("{userId:int}")]
    public async Task<IActionResult> FetchUser(int userId)
    {
        try
        {
            var user = await _dataContext.Users.FirstAsync(u => u.AppUserId == userId);
            user.Password = null;
                
            return Ok(user);
        }
        catch (Exception e)
        {
            return BadRequest(new { ResultMessage = e.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> RegisterUserAsync(UserModel user)
    {
        var appUser = new AppUser
        {
            Email = user.Email,
            Password = user.PasswordsGroup?.Password,
            CityId = user.CityId,
            CountryId = user.CountryId
        };

        try
        {
            _dataContext.Users.Add(appUser);
            await _dataContext.SaveChangesAsync();

              
            user.ResultMessage = "Success";
            user.PasswordsGroup = null;
            user.Id = appUser.AppUserId;
            return Ok(user);
        }
        catch (Exception e)
        {
            return BadRequest(new { ResultMessage = e.Message });
        }
    }
}