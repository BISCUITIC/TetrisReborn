using Domain.Entities;

namespace Application.Interfaces;

public interface IScoreRepository
{
    Task<Score?> GetBestByUserIdAsync(Guid userId);
    Task<List<Score>> GetByUserIdAsync(Guid userId);
    Task<List<Score>> GetLeaderboardAsync(int leaderBoardSize);
    Task AddAsync(Score score);    
}
