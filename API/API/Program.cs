using API.Constants;
using API.Endpoints;
using API.Extensions.WebApplicationBuilderExtensions;

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

        WebApplication app = builder.Build();

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
