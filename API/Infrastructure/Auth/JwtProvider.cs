using Infrastructure.Identity;
using Infrastructure.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Infrastructure.Auth;

public class JwtProvider : IJwtProvider
{
    private readonly JwtOptions _options;

    public JwtProvider(IOptions<JwtOptions> options)
    {
        _options = options.Value;
    }

    public string GenerateToken(ApplicationUser user)
    {
        Claim[] claims = [new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())];                

        string secretKey = _options.SecretKey;
        int expiresHours = _options.ExpiresHours;

        SymmetricSecurityKey securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(secretKey)
        );
        
        SigningCredentials signingCreditionals = new SigningCredentials(
            securityKey, 
            SecurityAlgorithms.HmacSha256
        );

        JwtSecurityToken token = new JwtSecurityToken(
            claims: claims,
            signingCredentials: signingCreditionals,
            expires: DateTime.UtcNow.AddHours(expiresHours)
        );

        return new JwtSecurityTokenHandler().WriteToken( token );
    }

}
