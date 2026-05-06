namespace API.Contracts.Score;

public sealed record ScoreResponse(
    Guid Id,
    int Value,
    DateTime CreatedAt
);
