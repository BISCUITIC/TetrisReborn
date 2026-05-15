using Infrastructure.Auth;
using Infrastructure.Interfaces;

namespace API.Extensions.WebApplicationBuilderExtensions;

internal static class JwtExtensions
{

    public static void AddJwt(this WebApplicationBuilder builder)
    {
        builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("JwtOptions"));

        builder.Services.AddScoped<IJwtProvider, JwtProvider>();
    }
}