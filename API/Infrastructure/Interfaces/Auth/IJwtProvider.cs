using Infrastructure.Identity;

namespace Infrastructure.Interfaces;

public interface IJwtProvider
{
    string GenerateToken(ApplicationUser user);
}
