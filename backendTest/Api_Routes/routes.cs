
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace testAblauf;


public static class UserEndpoints
{
    
    public static void MapUserEndpoints(this WebApplication app)
    {
        
        app.MapGet("/usersGet", async (AppDbContext db) => {

        var users = await db.User.ToListAsync();

        return TypedResults.Ok(users);

        });

        app.MapPost("/usersCreate", async (User user, AppDbContext db ) =>
        {

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.Password = passwordHash;

            db.User.Add(user);
            await db.SaveChangesAsync();

            return TypedResults.Created($"{user.Name} wurde erstellt!");

        });


        app.MapPost("/usersLogin", async (User user, AppDbContext db, HttpContext  httpContext) =>
        {
            var echterUser = await db.User.FirstOrDefaultAsync(a => a.Name == user.Name);

            if (echterUser == null || !BCrypt.Net.BCrypt.Verify(user.Password, echterUser.Password))
            {
                return Results.Unauthorized();
            }

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, echterUser.Id.ToString()),
            new Claim(ClaimTypes.Name, echterUser.Name)
        };

        var secretKey = "DeinExtremGeheimerUndMindestens32ZeichenLangerKey!";
        var keyBytes = Encoding.UTF8.GetBytes(secretKey);
        var symmetricKey = new SymmetricSecurityKey(keyBytes);
        var credentials = new SigningCredentials(symmetricKey, SecurityAlgorithms.HmacSha256);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = credentials
        };
        
        var handler = new JsonWebTokenHandler();
        string tokenString = handler.CreateToken(tokenDescriptor);

        httpContext.Response.Cookies.Append("test_token", tokenString, new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Strict,
            Expires =  DateTime.UtcNow.AddHours(1)
        });
            
        return TypedResults.Ok($"{echterUser.Name} Wurde erfolgreich eingeloggt!");
            
        });




    }
};





