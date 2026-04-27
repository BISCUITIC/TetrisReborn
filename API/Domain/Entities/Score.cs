namespace Domain.Entities;

public class Score
{
    public Guid Id { get; private set; }
    public Guid UserId { get; private set; }

    public int Value { get; private set; }
    public DateTime CreatedAt { get; private set; }

    private Score() { }

    public Score(Guid userId, int value)
    {
        Validate(userId, value);

        Id = Guid.NewGuid();
        UserId = userId;

        Value = value;
        CreatedAt = DateTime.UtcNow;
    }

    private void Validate(Guid userId, int value)
    {
        if (userId == Guid.Empty)
            throw new ArgumentException("UserId cannot be empty");

        if (value < 0)
            throw new ArgumentException("Score cannot be negative");
    }
}
