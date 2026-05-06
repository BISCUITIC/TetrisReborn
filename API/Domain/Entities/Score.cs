using CSharpFunctionalExtensions;

namespace Domain.Entities;

public class Score
{
    public const int MaxAvailableScore = 1_000_000;
    public const int MinAvailableScore = 0;

    public Guid Id { get; }
    public Guid UserId { get; }

    public int Value { get; }
    public DateTime CreatedAt { get; }

    private Score() { }

    private Score(Guid userId, int value, DateTime createdAt)
    {
        Id = Guid.NewGuid();
        UserId = userId;

        Value = value;
        CreatedAt = createdAt;
    }

    public static Result<Score> Create(Guid userId, int value)
    {
        if (userId == Guid.Empty)
            return Result.Failure<Score>($"'{nameof(userId)}' cannot be empty");

        if (value < MinAvailableScore)
            return Result.Failure<Score>($"Score cannot be less than {MinAvailableScore}");

        if (value > MaxAvailableScore)
            return Result.Failure<Score>($"Score cannot be more than {MaxAvailableScore}");

        Score score = new Score(userId, value, DateTime.UtcNow);

        return Result.Success(score);
    }
}
