

public class MeineCustomMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        Console.WriteLine("Vor der Anfrage...");
        await next(context);
        Console.WriteLine("Nach der Anfrage...");
    }
}