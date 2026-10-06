
using Microsoft.EntityFrameworkCore;

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


        app.MapPost("/usersLogin", async (User user, AppDbContext db) =>
        {
            var echterUser = await db.User.FirstOrDefaultAsync(a => a.Name == user.Name);

            if (echterUser == null)
            {
                return Results.Unauthorized();
            }

            bool isPasswordKorrect = BCrypt.Net.BCrypt.Verify(user.Password, echterUser.Password);
            
            if (isPasswordKorrect)
            {
                return Results.Ok($"Erfolgreich eingeloggt {user.Name}");
            } else
            {
                return Results.Unauthorized();
            }
            
            
        });




    }

}