using System.ComponentModel.DataAnnotations;

namespace RegistrationAPI.Validation;

public class RequiredTrueAttribute: ValidationAttribute
{
    public override bool IsValid(object? value)
    {
        return value is true;
    }
}