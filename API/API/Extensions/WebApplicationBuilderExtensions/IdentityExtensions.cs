using Infrastructure.Identity;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;

namespace API.Extensions.WebApplicationBuilderExtensions;

internal static class IdentityExtensions
{
    public static void AddIdentity(this WebApplicationBuilder builder)
    {
        builder.Services
               .AddIdentity<ApplicationUser, IdentityRole<Guid>>()
               .AddEntityFrameworkStores<ApplicationDbContext>()
               .AddDefaultTokenProviders();
    }
}