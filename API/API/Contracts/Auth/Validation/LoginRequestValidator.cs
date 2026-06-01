using FluentValidation;

namespace API.Contracts.Auth.Validation;

public class LoginRequestValidator : AbstractValidator<LoginRequest>
{
    public LoginRequestValidator()
    {
        RuleFor(request => request.UserName)
            .NotEmpty()
                .WithMessage("Username is required")
            .MinimumLength(3)
                .WithMessage("Username must be at least 3 characters long")
            .MaximumLength(128)
                .WithMessage("Username must not exceed 128 characters");

        RuleFor(request => request.Password)
            .NotEmpty()
                .WithMessage("Password is required")
            .MaximumLength(128)
                .WithMessage("Password must not exceed 128 characters");
    }
}
