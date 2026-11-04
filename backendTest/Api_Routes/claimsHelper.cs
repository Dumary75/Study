using System.Security.Claims;

namespace testAblauf;

public static class ClaimsHelper
{
    public static int? GetUserId(this ClaimsPrincipal user)
    {
        var wert = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return int.TryParse(wert, out int userId) ? userId : null;
    }

    public static int? GetProfileId(this ClaimsPrincipal user)
    {
        var wert = user.FindFirst("profile_id")?.Value;
        return int.TryParse(wert, out int profileId) ? profileId : null;
    }
}
