using API.Contracts.Score;
using Domain.Entities;

namespace API.Extensions.ScoreResponseExtensions;

public static class MapperExtensions
{
    public static ScoreResponse ToScoreResponse(this Score score)
    {
        return new ScoreResponse(score.Id, score.Value, score.CreatedAt);
    }
}
