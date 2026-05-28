using API.Constants;

namespace API.Extensions.WebApplicationBuilderExtensions;

internal static class CorsExtensions
{
    public static void AddCors(this WebApplicationBuilder builder)
    {
        builder.Services.AddCors(options => {
            options.AddPolicy(CorsPolicyNames.WebApplication, policy => {
                policy.WithOrigins(
                        "http://localhost:5500",
                        "http://127.0.0.1:5500"
                    )
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });
    }
}
