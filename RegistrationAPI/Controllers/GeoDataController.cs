using Microsoft.AspNetCore.Mvc;
using RegistrationAPI.Data;
using RegistrationAPI.ViewModels;

namespace RegistrationAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GeoDataController : ControllerBase
{
    private readonly RegistrationDataContext _dataContext;

    public GeoDataController(RegistrationDataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet("countries")]
    public CountriesResponseModel GetCountries()
    {
        try
        {
            return new CountriesResponseModel { Countries = _dataContext.Countries.ToList() };
        }
        catch (Exception e)
        {
            return new CountriesResponseModel() { Error = e, Status = "Exception" };
        }
    }

    [HttpGet("cities/{countryId:int}")]
    public CitiesResponseModel GetCities(int countryId)
    {
        try
        {
            var cities = _dataContext.Cities.Where(c => c.CountryId == countryId).ToList();
            return new CitiesResponseModel { Cities = cities, Error = null, Status = "OK" };
        }
        catch (Exception e)
        {
            return new CitiesResponseModel() { Error = e, Status = "Exception" };
        }
    }
}