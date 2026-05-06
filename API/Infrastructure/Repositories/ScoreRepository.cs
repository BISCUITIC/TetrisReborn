using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ScoreRepository : IScoreRepository
{
    private readonly ApplicationDbContext _context;

    public ScoreRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Score score)
    {
        await _context.Scores.AddAsync(score);
        await _context.SaveChangesAsync();
    }

    public async Task<Score?> GetBestByUserIdAsync(Guid userId)
    {
        return await _context.Scores
                             .Where(score => score.UserId == userId)
                             .OrderByDescending(score => score.Value)
                             .ThenByDescending(score => score.CreatedAt)
                             .FirstOrDefaultAsync();
    }

    public async Task<List<Score>> GetByUserIdAsync(Guid userId)
    {
        return await _context.Scores
                             .Where(score => score.UserId == userId)                             
                             .OrderByDescending(score => score.CreatedAt)
                             .ToListAsync();
    }

    public async Task<List<Score>> GetLeaderboardAsync(int leaderBoardSize)
    {
        var bestScores = _context.Scores
                             .GroupBy(score => score.UserId)
                             .Select(
                                group => new
                                {
                                    UserId = group.Key,
                                    Value = group.Max(score => score.Value),
                                }
                             );

        return await _context.Scores
                             .Join(
                                   bestScores, 
                                   score => new { score.UserId, score.Value },
                                   bestScore => new { bestScore.UserId, bestScore.Value },
                                   (score, bestScore) => score
                             )                             
                             .OrderByDescending(score => score.Value)
                             .ThenByDescending(score => score.CreatedAt)
                             .Take(leaderBoardSize)
                             .ToListAsync();
    }
}
