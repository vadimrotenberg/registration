namespace RegistrationAPI.ViewModels;

public class CommonResponse
{
    public object? Error { get; set; }
    public string Status { get; set; } = "OK";
}