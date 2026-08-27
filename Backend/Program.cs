using Scalar.AspNetCore;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

// Hier definieren wir eine Richtlinie namens "AllowReactApp"
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Hier den Port deines Frontends
              .AllowAnyMethod()                     // Erlaubt GET, POST, etc.
              .AllowAnyHeader();                    // Erlaubt alle Header
    });
});



builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    )
);


var app = builder.Build();

app.UseCors("AllowReactApp");


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.MapScalarApiReference();
}

app.MapGet("/api/arbeiter", async (AppDbContext db) =>
{

    var alleArbeiter = await db.Arbeiter.ToListAsync();

    return TypedResults.Ok(alleArbeiter);


});



// Erst ganz am Ende starten
app.Run(); 


public class Arbeiter
{
    public int Id {get; set; }
    public string Name {get; set;} = string.Empty;

    public string? Abteilung {get; set;}
}

