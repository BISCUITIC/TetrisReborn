using API.Contracts.Score;
using API.Extensions.ClaimsPrincipalExtensions;
using API.Extensions.ScoreResponseExtensions;
using Application;
using CSharpFunctionalExtensions;
using Domain.Entities;
using System.Security.Claims;

namespace API.Endpoints;

public static class ScoreEndpoints
{
    private const int MinLeaderboardSize = 1;
    private const int DefaultLeaderboardSize = 10;
    private const int MaxLeaderboardSize = 50; 

    public static void MapScoreEndpoints(this WebApplication app)
    {
        RouteGroupBuilder privateGroup = app.MapGroup("scores")
                                            .RequireAuthorization();

        RouteGroupBuilder publicGroup = app.MapGroup("scores");
                                            

        privateGroup.MapPost("", CreateNewScore);
        privateGroup.MapGet("me", GetUserScores);
        privateGroup.MapGet("me/best", GetUserBestScore);

        publicGroup.MapGet("leaderboard", GetLeaderboard);             
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

    private static async Task<Microsoft.AspNetCore.Http.IResult> GetUserScores(
        ClaimsPrincipal user,
        ScoreService service
    )
    {
        Guid userId;

        if (!user.TryGetUserId(out userId))
            return Results.Unauthorized();

        List<Score> scores = await service.GetUserScoresAsync(userId);

        return Results.Ok(scores.Select(score => score.ToScoreResponse())
                                .ToList());
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

    private static async Task<Microsoft.AspNetCore.Http.IResult> GetLeaderboard(
        int? top,
        ScoreService service
    )
    {
        int leaderBoardSize = top is null 
                            ? DefaultLeaderboardSize
                            : Math.Clamp(top.Value, MinLeaderboardSize, MaxLeaderboardSize);

        var result = await service.GetLeaderboardAsync(leaderBoardSize);

        return Results.Ok(result);
    }
}
