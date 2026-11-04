using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;



namespace testAblauf;


public static class UserEndpoints
{
    private const string CookieName = "test_token";

    private static CookieOptions CookieOptionen() => new CookieOptions
    {
        HttpOnly = true,
        Secure = false,
        SameSite = SameSiteMode.Strict,
        Expires = DateTime.UtcNow.AddHours(1)
    };

    // Ein JWT lässt sich nicht nachträglich ändern (die Signatur würde brechen),
    // deshalb wird bei der Profilwahl ein neues Token ausgestellt und das alte
    // Cookie ersetzt. profileId = null bedeutet: noch kein Profil gewählt.
    private static void TokenInCookieSchreiben(HttpContext httpContext, IConfiguration configuration,
        int userId, string userName, int? profileId)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
            new Claim(ClaimTypes.Name, userName)
        };

        if (profileId.HasValue)
        {
            claims.Add(new Claim("profile_id", profileId.Value.ToString()));
        }

        var keyBytes = Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!);
        var credentials = new SigningCredentials(new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = credentials
        };

        var handler = new JsonWebTokenHandler();
        string tokenString = handler.CreateToken(tokenDescriptor);

        httpContext.Response.Cookies.Append(CookieName, tokenString, CookieOptionen());
    }


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

            db.User.Remove(gefundenUser); // Profile + MyList hängen per Cascade dran

            await db.SaveChangesAsync();



        return Results.NoContent(); // 204 No Content ist Standard bei DELETE
        });


        // -- Login Block um JWT in Cookie zu returnen -- //
        app.MapPost("/usersLogin", async (User user, AppDbContext db, HttpContext  httpContext, IConfiguration configuration) =>
        {
            var echterUser = await db.User.FirstOrDefaultAsync(a => a.Name == user.Name);

            if (echterUser == null || !BCrypt.Net.BCrypt.Verify(user.Password, echterUser.Password))
            {
                return Results.Unauthorized();
            }

            // Direkt nach dem Login ist noch kein Profil gewählt -> kein profile_id-Claim.
            TokenInCookieSchreiben(httpContext, configuration, echterUser.Id, echterUser.Name, null);

        return TypedResults.Ok($"{echterUser.Name} Wurde erfolgreich eingeloggt!");

        });


        // -- Logout: Cookie löschen -- //
        app.MapPost("/usersLogout", (HttpContext httpContext) =>
        {
            httpContext.Response.Cookies.Delete(CookieName, new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Strict
            });

            return TypedResults.Ok("Erfolgreich ausgeloggt!");
        });


        // -- AutoCheck bei Website Aufruf -- //
        app.MapGet("/authcheck", async (HttpContext context, AppDbContext db) =>
        {
            var userId = context.User.GetUserId();
            var profileId = context.User.GetProfileId();

            Profile? aktivesProfil = null;

            // Das Profil kommt frisch aus der DB: existiert es nicht mehr (gelöscht),
            // gilt es als nicht ausgewählt und das Frontend zeigt wieder die Auswahl.
            if (userId.HasValue && profileId.HasValue)
            {
                aktivesProfil = await db.Profiles
                    .FirstOrDefaultAsync(p => p.Id == profileId.Value && p.UserId == userId.Value);
            }

            return Results.Ok(new { isAuthenticated = true, activeProfile = aktivesProfil });

        })
        .RequireAuthorization();


        // -- Profil-Section -- //

        app.MapGet("/myProfiles", async (HttpContext context, AppDbContext db) =>
        {
            var userId = context.User.GetUserId();

            // 🔑 .Where(...) statt .FirstOrDefault(...) + .ToListAsync() macht daraus eine Liste!
            var userProfiles = await db.Profiles
                .Where(p => p.UserId == userId)
                .ToListAsync();

            return Results.Ok(userProfiles); // Gibt ein JSON-Array [] zurück
        })
        .RequireAuthorization();


        app.MapPost("/profilCreate", async (Profile profile, HttpContext context, AppDbContext db) =>
        {
            var userId = context.User.GetUserId();
            if (userId == null)
            {
                return Results.Unauthorized();
            }

            profile.Id = 0;
            profile.UserId = userId.Value;

            db.Profiles.Add(profile);
            await db.SaveChangesAsync();

            return Results.Created("", profile);
        })
        .RequireAuthorization();


        // -- Profil auswählen: Besitz einmalig prüfen, dann Token mit profile_id -- //

        app.MapPost("/profiles/select/{id}", async (int id, HttpContext context, AppDbContext db, IConfiguration configuration) =>
        {
            var userId = context.User.GetUserId();
            if (userId == null)
            {
                return Results.Unauthorized();
            }

            var profil = await db.Profiles
                .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId.Value);

            if (profil == null)
            {
                return Results.NotFound();
            }

            TokenInCookieSchreiben(context, configuration, userId.Value, context.User.Identity?.Name ?? "", profil.Id);

            return Results.Ok(profil);
        })
        .RequireAuthorization();


        app.MapDelete("/profiles/{id}", async (int id, HttpContext context, AppDbContext db) =>
        {
            var userId = context.User.GetUserId();
            if (userId == null)
            {
                return Results.Unauthorized();
            }

            var profil = await db.Profiles
                .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId.Value);

            if (profil == null)
            {
                return Results.NotFound();
            }

            db.Profiles.Remove(profil); // MyList hängt per Cascade dran
            await db.SaveChangesAsync();

            return Results.NoContent();
        })
        .RequireAuthorization();


        // -- MyList: gehört immer zu dem Profil aus dem Token -- //

        app.MapGet("/myList", async (HttpContext context, AppDbContext db) =>
        {
            var profileId = context.User.GetProfileId();
            if (profileId == null)
            {
                return Results.BadRequest("Kein Profil ausgewählt!");
            }

            var eintraege = await db.MyListItems
                .Where(m => m.ProfileId == profileId.Value)
                .OrderByDescending(m => m.Id) // neueste zuerst, kein Datums-Feld nötig
                .ToListAsync();

            return Results.Ok(eintraege);
        })
        .RequireAuthorization();


        app.MapPost("/myList", async (MyListItem item, HttpContext context, AppDbContext db) =>
        {
            var profileId = context.User.GetProfileId();
            if (profileId == null)
            {
                return Results.BadRequest("Kein Profil ausgewählt!");
            }

            // Dem Client wird nicht geglaubt: Id und ProfileId kommen vom Server.
            item.Id = 0;
            item.ProfileId = profileId.Value;
            item.Profile = null;

            db.MyListItems.Add(item);
            await db.SaveChangesAsync();

            return Results.Created($"/myList/{item.Id}", item);
        })
        .RequireAuthorization();


        app.MapDelete("/myList/{id}", async (int id, HttpContext context, AppDbContext db) =>
        {
            var profileId = context.User.GetProfileId();
            if (profileId == null)
            {
                return Results.BadRequest("Kein Profil ausgewählt!");
            }

            var eintrag = await db.MyListItems
                .FirstOrDefaultAsync(m => m.Id == id && m.ProfileId == profileId.Value);

            if (eintrag == null)
            {
                return Results.NotFound();
            }

            db.MyListItems.Remove(eintrag);
            await db.SaveChangesAsync();

            return Results.NoContent();
        })
        .RequireAuthorization();

    }
};







