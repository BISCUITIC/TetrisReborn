using API.Endpoints;
using API.Extensions;
using Application;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Repositories;

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

        builder.Services.AddScoped<ScoreService>();
        builder.Services.AddScoped<IScoreRepository, ScoreRepository>();

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
