
using Microsoft.AspNetCore.Authentication.JwtBearer;
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

        // -- User Funktionen Allgemein --//
        
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

        app.MapDelete("/usersDelete/{id}", async (int id, AppDbContext db) => 
        {
        


            var gefundenUser = await db.User.FirstOrDefaultAsync(foundUser => foundUser.Id == id);


            if (gefundenUser == null)
            {
                return TypedResults.NotFound();
            }

            db.User.Remove(gefundenUser);

            await db.SaveChangesAsync();

            



        return Results.NoContent(); // 204 No Content ist Standard bei DELETE
        });


        // -- Riesiger Login Block um JWT in Cookie zu returnen -- //
        app.MapPost("/usersLogin", async (User user, AppDbContext db, HttpContext  httpContext, IConfiguration configuration) =>
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

        var secretKey = configuration["Jwt:Key"]!;
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


        // -- AutoCheck bei Website Aufruf -- //
        app.MapGet("/authcheck", async (HttpContext context) =>
        {

            return Results.Ok(new { isAuthenticated = true });

        })
        .RequireAuthorization(); 


        // -- Profil-Section -- //

        app.MapGet("/myProfiles", async (HttpContext context, AppDbContext db) =>
        {
            var userIdString = context.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            int.TryParse(userIdString, out int userId);

            // 🔑 .Where(...) statt .FirstOrDefault(...) + .ToListAsync() macht daraus eine Liste!
            var userProfiles = await db.Profiles
                .Where(p => p.UserId == userId)
                .ToListAsync();

            return Results.Ok(userProfiles); // Gibt ein JSON-Array [] zurück
        })
        .RequireAuthorization();


        

        app.MapPost("/profilCreate", async (Profile profile, HttpContext context, AppDbContext db) =>
        {
            var userIdString = context.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            int.TryParse(userIdString, out int userId);

            // Jetzt kennt er `profile` (und du musst ihm noch die `UserId` zuweisen):
            profile.UserId = userId;

            db.Profiles.Add(profile);
            await db.SaveChangesAsync();

            return Results.Created("", profile);
        })
        .RequireAuthorization();



    }
};





