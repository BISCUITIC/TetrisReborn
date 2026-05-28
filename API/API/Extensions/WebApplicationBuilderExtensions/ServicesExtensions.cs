using Application;

namespace API.Extensions.WebApplicationBuilderExtensions;

internal static class ServicesExtensions
{
    public static void AddServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<ScoreService>();        
    }
}