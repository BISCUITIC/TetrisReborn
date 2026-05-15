using Application.Interfaces;
using Infrastructure.Repositories;

namespace API.Extensions.WebApplicationBuilderExtensions;

internal static class RepositoriesExtensions
{
    public static void AddRepositories(this WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<IScoreRepository, ScoreRepository>();
    }
}