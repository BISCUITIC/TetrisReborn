using System.ComponentModel.DataAnnotations;

namespace API.Contracts.Score;

public sealed record class CreateScoreRequest
(
    [Required, Range(Domain.Entities.Score.MinAvailableScore, 
                     Domain.Entities.Score.MaxAvailableScore)] int Value
);
