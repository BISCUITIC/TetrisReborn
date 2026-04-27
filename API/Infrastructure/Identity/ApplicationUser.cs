using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity;

public class ApplicationUser : IdentityUser<Guid> { 
    public ICollection<Score> Scores { get; } = new List<Score>();
}
