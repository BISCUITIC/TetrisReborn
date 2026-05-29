using API.Constants;
using API.Endpoints;
using API.Extensions.WebApplicationBuilderExtensions;
using FluentValidation;
using FluentValidation.AspNetCore;
using API.Contracts.Auth.Validation;

namespace API;

public class Program
{
    public static void Main(string[] args)
    {        
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        builder.AddDatabase();
        builder.AddIdentity();

        builder.AddJwt();
        builder.AddJwtSwaggerGen();
        builder.AddJwtAuthentication();

        builder.AddRepositories();
        builder.AddServices();

        builder.AddCors();
        builder.AddProblemDetails();
        builder.Services.AddFluentValidationAutoValidation();
        builder.Services.AddValidatorsFromAssemblyContaining<Program>();

        WebApplication app = builder.Build();

        app.UseExceptionHandler();

        app.UseStatusCodePages();

        app.UseStaticFiles();

        app.UseRouting();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseCors(CorsPolicyNames.WebApplication);
        }

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapAuthEndpoints();
        app.MapScoreEndpoints();

        app.Run();
    }
}
