using API.Extensions;

namespace API;

public class Program
{
    public static void Main(string[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        builder.AddDatabase();

        WebApplication app = builder.Build();

        app.MapGet("/", () => "Hello World!");

        app.Run();
    }
}
