using API.Contracts.Score;
using API.Extensions;
using Application;
using CSharpFunctionalExtensions;
using Domain.Entities;
using System.Security.Claims;

namespace API.Endpoints;

public static class ScoreEndpoints
{
    public static void MapScoreEndpoints(this WebApplication app)
    {
        RouteGroupBuilder group = app.MapGroup("scores")
                                     .RequireAuthorization();

        group.MapPost("", CreateNewScore);
        group.MapGet("me/best", GetUserBestScore);        
    }


    private static async Task<Microsoft.AspNetCore.Http.IResult> CreateNewScore(
        CreateScoreRequest request,
        ClaimsPrincipal user,
        ScoreService service
    )
    {
        Guid userId;

        if(!user.TryGetUserId(out userId))        
            return Results.Unauthorized();        

        Result<Score> result = await service.CreateScoreAsync(userId, request.Value);

        return result.IsSuccess
             ? Results.Ok(result.Value.ToScoreResponse())
             : Results.BadRequest(result.Error);
    }

    private static async Task<Microsoft.AspNetCore.Http.IResult> GetUserBestScore(
        ClaimsPrincipal user,
        ScoreService service
    )
    {
        Guid userId;

        if (!user.TryGetUserId(out userId))       
            return Results.Unauthorized();        

        Score? bestScore = await service.GetUserBestScoreAsync(userId);

        return bestScore is null
             ? Results.NotFound()
             : Results.Ok(bestScore.ToScoreResponse());
    }
}
