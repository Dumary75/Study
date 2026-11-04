using Microsoft.EntityFrameworkCore;

namespace testAblauf;



    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> User => Set<User>();
        public DbSet<Profile> Profiles => Set<Profile>();
        public DbSet<MyListItem> MyListItems => Set<MyListItem>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User löschen räumt seine Profile ab ...
            modelBuilder.Entity<Profile>()
                .HasOne(p => p.User)
                .WithMany(u => u.Profiles)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // ... Profil löschen räumt dessen MyList ab.
            modelBuilder.Entity<MyListItem>()
                .HasOne(m => m.Profile)
                .WithMany(p => p.MyList)
                .HasForeignKey(m => m.ProfileId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
