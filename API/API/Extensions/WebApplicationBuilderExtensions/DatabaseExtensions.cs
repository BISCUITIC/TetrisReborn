using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions.WebApplicationBuilderExtensions;

internal static class DatabaseExtensions
{
    private const string CONNECTION_STRING_NOT_FOUND =
        "Connection string 'DefaultConnection' not found.";

    public static void AddDatabase(this WebApplicationBuilder builder)
    {
        string connection = builder.Configuration
                                   .GetConnectionString("DefaultConnection")
                                   ?? throw new InvalidOperationException(CONNECTION_STRING_NOT_FOUND);


        builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connection));
    }
}