namespace API.Extensions.WebApplicationBuilderExtensions;

public static class ProblemDetailsExtensions
{
    public static void AddProblemDetails(this WebApplicationBuilder app)
    {
        app.Services.AddProblemDetails(options =>
        {
            options.CustomizeProblemDetails = context =>
            {                
                context.ProblemDetails.Extensions["timestamp"] = DateTime.UtcNow;

                if (context.ProblemDetails is HttpValidationProblemDetails)
                {
                    context.ProblemDetails.Type =
                        "validation/request-invalid";

                    context.ProblemDetails.Title =
                        "Request validation failed";
                }
            };            
        });
    }
}
