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
}
