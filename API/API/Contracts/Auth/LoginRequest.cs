namespace API.Contracts.Auth;

public sealed record class LoginRequest
(
    string UserName,
    string Password
);
