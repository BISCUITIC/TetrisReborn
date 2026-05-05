using Domain.Entities;

namespace Application.Interfaces;

public interface IScoreRepository
{
    Task<Score?> GetBestByUserIdAsync(Guid userId);
    Task AddAsync(Score score);    
}
