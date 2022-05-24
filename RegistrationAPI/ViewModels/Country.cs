namespace RegistrationAPI.ViewModels;

public class Country
{
    public int CountryId { get; set; }
    public string CountryName { get; set; } = "";
    public IEnumerable<City>? Cities { get; set; }
}