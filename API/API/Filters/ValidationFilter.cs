using API.Constants;
using FluentValidation;
using FluentValidation.Results;

namespace API.Filters;

public class ValidationFilter<T> : IEndpointFilter 
{
    private readonly IValidator<T> _validator;

    public ValidationFilter(IValidator<T> validator)
    {
        _validator = validator;
    }

    public async ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext context, 
        EndpointFilterDelegate next)
    {
        T? request = context.Arguments.OfType<T>().FirstOrDefault();

        if (request is null)
        {
            return Results.Problem(type: ValidationProblemTypes.RequestInvalid,
                                   title: "Request validation failed",
                                   detail: "Request payload is invalid",
                                   statusCode: StatusCodes.Status400BadRequest);
        }
            
        ValidationResult result = await _validator.ValidateAsync(request);

        if (result.IsValid)
            return await next(context);

        Dictionary<string, string[]> errors = GetErrors(result.Errors);

        return Results.ValidationProblem(errors,
                                         type: ValidationProblemTypes.RequestInvalid,
                                         title: "Request validation failed",
                                         statusCode: StatusCodes.Status400BadRequest);
    }

    private Dictionary<string, string[]> GetErrors(IEnumerable<ValidationFailure> errorsList)
    {
        return errorsList.GroupBy(error => error.PropertyName)
                         .ToDictionary(
                            group => group.Key,
                            group => group.Select(error => error.ErrorMessage).ToArray()
                         );
    }
}
