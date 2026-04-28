using CSharpFunctionalExtensions;

namespace Domain.Entities;

public class Score
{
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

    static public Result<Score> Create(Guid userId, int value)
    {
        if (userId == Guid.Empty)
            return Result.Failure<Score>($"'{nameof(userId)}' cannot be empty");

        if (value < 0)
            return Result.Failure<Score>("Score cannot be negative");

        Score score = new Score(userId, value, DateTime.UtcNow);

        return Result.Success(score);
    }
}
