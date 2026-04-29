using API.Endpoints;
using API.Extensions;

namespace API;

public class Program
{
    public static void Main(string[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        builder.AddJwtSwaggerGen();
        builder.AddDatabase();
        builder.AddIdentity();
        builder.AddJwt();
        builder.AddJwtAuthentication();

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

        app.Run();
    }
}
