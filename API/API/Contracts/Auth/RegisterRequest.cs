using System.ComponentModel.DataAnnotations;

namespace API.Contracts.Auth;

public sealed record class RegisterRequest
(
    [Required, MaxLength(128)] string UserName,
    [Required, MaxLength(128)] string Password
);
