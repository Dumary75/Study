
using Microsoft.EntityFrameworkCore;

namespace testAblauf;



    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> User => Set<User>();
    }