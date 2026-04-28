using API.Extensions;
using Infrastructure.Identity;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;


namespace API.Extensions;

internal static class WebApplicationBuilderExtensions
{
    private const string CONNECTION_STRING_NOT_FOUND =
        "Connection string 'DefaultConnection' not found.";
    private const string JWT_KEY_NOT_FOUND =
        "Jwt secret key not found.";


    public static void AddDatabase(this WebApplicationBuilder builder)
    {
        string connection = builder.Configuration
                                   .GetConnectionString("DefaultConnection")
                                   ?? throw new InvalidOperationException(CONNECTION_STRING_NOT_FOUND);


        builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connection));
    }

    public static void AddIdentity(this WebApplicationBuilder builder)
    {
        builder.Services
               .AddIdentity<ApplicationUser, IdentityRole<Guid>>()
               .AddEntityFrameworkStores<ApplicationDbContext>()
               .AddDefaultTokenProviders();
    }

    public static void AddJwtAuthentication(this WebApplicationBuilder builder)
    {
        string secretKey = builder.Configuration["Jwt:Key"]                                  
                                  ?? throw new InvalidOperationException(JWT_KEY_NOT_FOUND);

        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                        .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, (options) =>
                        {
                            options.TokenValidationParameters = new TokenValidationParameters()
                            {
                                ValidateIssuer = false,
                                ValidateAudience = false,
                                ValidateLifetime = true,
                                ValidateIssuerSigningKey = true,

                                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
                            };
                        });

        builder.Services.AddAuthorization();
    }
}
