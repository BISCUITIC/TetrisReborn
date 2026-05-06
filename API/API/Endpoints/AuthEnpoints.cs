using API.Contracts.Auth;
using Infrastructure.Identity;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace API.Endpoints;

public static class AuthEnpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        RouteGroupBuilder auth = app.MapGroup("/auth");

        auth.MapPost("/register", Register);
        auth.MapPost("/login", Login);
        auth.MapGet("/me", Me).RequireAuthorization();
    }

    private static async Task<IResult> Register(RegisterRequest request,
                                                UserManager<ApplicationUser> userManager)
    {
        ApplicationUser user = new ApplicationUser()
        {
            UserName = request.UserName
        };

        IdentityResult result = await userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)        
            return Results.BadRequest(result.Errors);

        return Results.Ok(new { user.Id });
    }

    private static async Task<IResult> Login(LoginRequest request,
                                             UserManager<ApplicationUser> userManager,
                                             IJwtProvider jwtProvider)
    {
        ApplicationUser? user = await userManager.FindByNameAsync(request.UserName);
        if (user is null)        
            return Results.Unauthorized();        

        bool isPasswordValid = await userManager.CheckPasswordAsync(user, request.Password);
        if (!isPasswordValid)        
            return Results.Unauthorized();
        

        string token = jwtProvider.GenerateToken(user);

        return Results.Ok(new { token });
    }

    private static async Task<IResult> Me(ClaimsPrincipal principal)
    {
        string? id = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (id is null)
            return Results.Unauthorized();

        return Results.Ok(new { id });
    }
}
