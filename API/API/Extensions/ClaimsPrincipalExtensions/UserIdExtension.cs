using System.Security.Claims;

namespace API.Extensions.ClaimsPrincipalExtensions;

public static class UserIdExtension
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
