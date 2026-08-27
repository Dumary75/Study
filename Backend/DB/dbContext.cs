using Microsoft.EntityFrameworkCore;

// 1. Wichtig: Der Namespace muss zu deinem Projekt passen (z.B. dein Projektname)


public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Arbeiter> Arbeiter => Set<Arbeiter>();
}