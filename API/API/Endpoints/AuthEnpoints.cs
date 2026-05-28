using API.Contracts.Auth;
using API.Endpoints.Problems;
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
            return AuthProblems.RegistrationValidation(result.Errors);       

        return Results.Ok(new { user.Id });
    }

    private static async Task<IResult> Login(LoginRequest request,
                                             UserManager<ApplicationUser> userManager,
                                             IJwtProvider jwtProvider)
    {
        ApplicationUser? user = await userManager.FindByNameAsync(request.UserName);        
        if (user is null)
            return AuthProblems.AuthenticationFailed();

        bool isPasswordValid = await userManager.CheckPasswordAsync(user, request.Password);
        if (!isPasswordValid)
            return AuthProblems.AuthenticationFailed();

        string token = jwtProvider.GenerateToken(user);

        return Results.Ok(new { token });
    }

    private static async Task<IResult> Me(ClaimsPrincipal principal)
    {
        string? id = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (id is null)
            return AuthProblems.MeUnauthorized();

        return Results.Ok(new { id });
    }
}
