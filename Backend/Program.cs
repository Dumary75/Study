var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();


app.Run( async (HttpContext context) => 
{

    if (context.Request.Path.StartsWithSegments("/")) 
{ 

       await context.Response.WriteAsync($"Was geeeeht? Hier, methode: {context.Request.Method}");
} else if (context.Request.Path.StartsWithSegments("/andere"))
    {
        await context.Response.WriteAsync($"Andere, ja? hier Path: {context.Request.Path}");
    };


        
        });

app.Run();


