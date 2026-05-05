using Infrastructure.Auth;
using Infrastructure.Identity;
using Infrastructure.Interfaces;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace API.Extensions;

internal static class WebApplicationBuilderExtensions
{
    private const string CONNECTION_STRING_NOT_FOUND =
        "Connection string 'DefaultConnection' not found.";
    private const string JWT_SHEME =
        JwtBearerDefaults.AuthenticationScheme;

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

    public static void AddJwtSwaggerGen(this WebApplicationBuilder builder)
    {
        builder.Services.AddEndpointsApiExplorer();

        builder.Services.AddSwaggerGen(options =>
        {
            options.AddSecurityDefinition(JWT_SHEME, new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                In = ParameterLocation.Header,
                Scheme = "bearer",
                BearerFormat = "JWT",
                Description = "Enter your API key"
            });

            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = JWT_SHEME
                        }
                    },
                    new string[] {}
                }
            });
        });
    }

    public static void AddJwt(this WebApplicationBuilder builder)
    {
        builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("JwtOptions"));

        builder.Services.AddScoped<IJwtProvider, JwtProvider>();
    }

    public static void AddJwtAuthentication(this WebApplicationBuilder builder)
    {
        JwtOptions jwtOptions = builder.Configuration
                                       .GetSection("JwtOptions")
                                       .Get<JwtOptions>()
                                       ?? throw new InvalidOperationException("JwtOptions not configured");

        string secretKey = jwtOptions.SecretKey;

        builder.Services.AddAuthentication(options =>
                        {
                            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                        })
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
