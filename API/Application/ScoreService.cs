using Application.Interfaces;
using CSharpFunctionalExtensions;
using Domain.Entities;

namespace Application;

public class ScoreService
{
    private readonly IScoreRepository _repository;

    public ScoreService(IScoreRepository repository)
    {
        _repository = repository;
    }

    public async Task<Result<Score>> CreateScoreAsync(Guid userId, int value)
    {
        Result<Score> result = Score.Create(userId, value);

        if(result.IsFailure) 
            return result;

        Score newScore = result.Value;

        Score? bestScore = await _repository.GetBestByUserIdAsync(userId);

        if (bestScore is null)
        {
            await _repository.AddAsync(newScore);
            return Result.Success(newScore);
        }

        if (bestScore.Value >= newScore.Value)
        {
            return Result.Failure<Score>(
                $"New score ({newScore.Value}) is not higher than current best ({bestScore.Value})"
            );
        }

        await _repository.AddAsync(newScore);

        return Result.Success(newScore);
    }

    public async Task<Score?> GetUserBestScoreAsync(Guid userId)
    {
        return await _repository.GetBestByUserIdAsync(userId);
    }
}
