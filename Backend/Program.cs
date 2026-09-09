using Scalar.AspNetCore;
using Microsoft.EntityFrameworkCore;


using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

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

    return  TypedResults.Ok(alleArbeiter);
    

});

app.MapPost("/api/arbeiter", async (AppDbContext db, Arbeiter newArbeiter) =>
{

    db.Arbeiter.Add(newArbeiter);

    await db.SaveChangesAsync();

    return TypedResults.Created($"{newArbeiter.Name} wurde erstellt!");


});


app.MapPost("/api/test-login", (LoginRequest request) =>
{

    var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, request.Username),
        new Claim(ClaimTypes.Role, "Tester")  
    };

    var secretKeyString = builder.Configuration["SecretKey:key"]!;
    var keyBytes = Encoding.UTF8.GetBytes(secretKeyString);
    var credentials = new SigningCredentials(new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256);

    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.UtcNow.AddMinutes(20),
        SigningCredentials = credentials
    };

    // 5. Token mit dem modernen Handler erzeugen
    var tokenHandler = new JsonWebTokenHandler();
    var tokenString = tokenHandler.CreateToken(tokenDescriptor);

    // 6. Als JSON an den Client schicken
    return Results.Ok(new 
    { 
        access_token = tokenString, 
        message = $"Token erfolgreich generiert für {request.Username}!" 
    });

    
});



// Erst ganz am Ende starten
app.Run(); 

record LoginRequest(string Username, string Password);


public class Arbeiter
{
    public int Id {get; set; }
    
    public string Name {get; set;} = string.Empty;

    public string? Position {get; set;} 

    public Arbeiter() {}

    public Arbeiter(int id, string name, string? position)
    {
        Id = id;
        Name = name;
        Position = position;
    }
}

