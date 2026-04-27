using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

internal static class WebApplicationBuilderExtensions
{
    public static void AddDatabase(this WebApplicationBuilder builder)
    {
        string connection = builder.Configuration
                                   .GetConnectionString("DefaultConnection")
                                   ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");


        builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connection));
    }

}
