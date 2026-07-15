
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Hier definierst du deine Routen
app.MapGet("/", async (HttpContext context) => {
    await context.Response.WriteAsync("Startseite");
});

app.MapGet("/andere", async (HttpContext context) => {
    await context.Response.WriteAsync("Andere Seite");
});

// Erst ganz am Ende starten
app.Run(); 


public class Employee { "name:" ""}