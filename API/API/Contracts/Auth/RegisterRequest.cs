using System.ComponentModel.DataAnnotations;

namespace API.Contracts.Auth;

public sealed record class RegisterRequest
(
    string UserName,
    string Password
);
