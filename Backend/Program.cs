using Scalar.AspNetCore;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Authentication.JwtBearer;
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

builder.Services.AddAuthentication(options =>
{
    // Hier legst du optional fest, was der globale Standard sein soll
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["SecretKey:key"]!)),
        ValidateLifetime = true,
        ValidateIssuer = false,
        ValidateAudience = false
    };

    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            Console.WriteLine($"JWT FEHLER: {context.Exception.Message}");
            return Task.CompletedTask;
        }
    };
})
.AddCookie("MyNetflixSession", options =>
{
    options.Cookie.Name = "MyNetflixSession";
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite = SameSiteMode.Strict;
    options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
    options.SlidingExpiration = true;
});

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseCors("AllowReactApp");

app.UseAuthentication();
app.UseAuthorization();


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.MapScalarApiReference();
}

app.MapGet("/api/arbeiter", async (AppDbContext db) =>
{

    var Liste = await db.Arbeiter.ToListAsync();

    return  TypedResults.Ok($"Hier die Liste: {Liste}");
    

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

