
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

        app.MapPost("usersCreate", async (User user, AppDbContext db )=>
        {

            db.User.Add(user);
            await db.SaveChangesAsync();

            return TypedResults.Created($"{user.Name} wurde erstellt!");

        });


    }

}