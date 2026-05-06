using API.Contracts.Score;
using Domain.Entities;

namespace API.Extensions;

public static class ScoreExtensions
{
    public static ScoreResponse ToScoreResponse(this Score score)
    {
        return new ScoreResponse(score.Id, score.Value, score.CreatedAt);
    }
}
