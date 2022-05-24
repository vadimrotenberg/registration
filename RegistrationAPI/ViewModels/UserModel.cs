using System.ComponentModel.DataAnnotations;

namespace RegistrationAPI.ViewModels;

public class UserModel
{
    [Required]
    [EmailAddress]
    public string? Email { get; set; }

    [Required]
    public PasswordsGroup? PasswordsGroup { get; set; }

    [Required]
    public int? CountryId { get; set; }

    [Required]
    public int? CityId { get; set; }
    public string? ResultMessage { get; set; } = null;
    public long? Id { get; set; }
}

public class PasswordsGroup
{
    [Required]
    [RegularExpression("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{2,}$")]
    public string? Password { get; set; }

    [Required]
    [RegularExpression("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{2,}$")]
    [Compare("Password")]
    public string? ConfirmPassword { get; set; }
}