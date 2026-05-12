using API.Endpoints;
using API.Extensions;

namespace API;

public class Program
{
    public const string Frontend = "Frontend";

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

        builder.Services.AddCors(options => {
            options.AddPolicy(Frontend, policy =>{
                policy.WithOrigins(
                        "http://localhost:5500",
                        "http://127.0.0.1:5500"
                    )
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

        WebApplication app = builder.Build();

        app.UseStaticFiles();

        app.UseRouting();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseCors(Frontend);
        }

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapAuthEndpoints();
        app.MapScoreEndpoints();

        app.Run();
    }
}
