using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static bool TryGetUserId(this ClaimsPrincipal user, out Guid userId)
    {
        userId = Guid.Empty;

        Claim? userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier);

        if (userIdClaim is null)
            return false;

        userId = Guid.Parse(userIdClaim.Value);

        return true;
    }
}
