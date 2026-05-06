using API.Endpoints;
using API.Extensions;

namespace API;

public class Program
{
    public static void Main(string[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        builder.AddDatabase();
        builder.AddIdentity();

        builder.AddJwtSwaggerGen();
        builder.AddJwt();
        builder.AddJwtAuthentication();

        builder.AddRepositories();
        builder.AddServices();

        WebApplication app = builder.Build();

        app.UseStaticFiles();

        app.UseRouting();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapAuthEndpoints();
        app.MapScoreEndpoints();

        app.Run();
    }
}
