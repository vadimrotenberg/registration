using Microsoft.EntityFrameworkCore;
using RegistrationAPI.ViewModels;

namespace RegistrationAPI.Data;

public class RegistrationDataContext : DbContext
{
    public RegistrationDataContext(DbContextOptions<RegistrationDataContext> options): base(options){}
    public DbSet<Country> Countries => Set<Country>();
    public DbSet<City> Cities => Set<City>();
    public DbSet<AppUser> Users => Set<AppUser>();

}