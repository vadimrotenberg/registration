using RegistrationAPI.ViewModels;

namespace RegistrationAPI;

public class AppUser
{
    public long AppUserId { get; set; }
    public string? Email { get; set; }
     
    public string? Password  { get; set; }
        
    public int? CountryId { get; set; }
      
    public int? CityId { get; set; }

    public Country? Country { get; set; }
    public City? City { get; set; }
}