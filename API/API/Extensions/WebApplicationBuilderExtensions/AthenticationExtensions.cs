using Infrastructure.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace API.Extensions.WebApplicationBuilderExtensions;

internal static class AthenticationExtensions
{
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