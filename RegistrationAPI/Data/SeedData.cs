using RegistrationAPI.ViewModels;

namespace RegistrationAPI.Data;

public class SeedData
{
    public static void FillData(RegistrationDataContext dataContext)
    {
  
        var country1 = new Country {CountryName = "USA" };
        var country2 = new Country {CountryName = "India" };
        var country3 = new Country {  CountryName = "France" };

        if (dataContext.Countries.Any() == false)
        {
            dataContext.Countries.AddRange(country1, country2, country3);
            dataContext.SaveChanges();
        }

        var city1 = new City { CityName = "New York", CountryId  = 1};
        var city2 = new City { CityName = "Bombay", CountryId = 2};
        var city3 = new City {  CityName = "Paris", CountryId = 3};

        if (dataContext.Cities.Any() == false)
        {
            dataContext.Cities.AddRange(city1, city2, city3);
            dataContext.SaveChanges();
        }
    }
}