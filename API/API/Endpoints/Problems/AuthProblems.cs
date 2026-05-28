using API.Constants;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace API.Endpoints.Problems;

public static class AuthProblems
{
    public static IResult AuthenticationFailed()
    {
        return Results.Problem(
           type: AuthProblemTypes.InvalidCreditionals,
           title: "Authentication failed",
           detail: "Invalid username or password",
           statusCode: StatusCodes.Status401Unauthorized
        );
    }

    public static IResult RegistrationValidation(IEnumerable<IdentityError> errors)
    {
        Dictionary<string, string[]> validationErrors =
            errors.GroupBy(error => error.Code)
                  .ToDictionary(
                        group => group.Key,
                        group => group.Select(error => error.Description).ToArray()
                  );

        return Results.ValidationProblem(
            type: AuthProblemTypes.RegistrationValidationFailed,
            title: "Registration validation failed",
            errors: validationErrors,            
            statusCode: StatusCodes.Status400BadRequest
        );
    }

    public static IResult MeUnauthorized()
    {
        return Results.Problem(
            type: AuthProblemTypes.MeUnauthorized,
            title: "Unauthorized",
            detail: "User is not authenticated or token is missing",
            statusCode: StatusCodes.Status401Unauthorized
        );
    }
}
