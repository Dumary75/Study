
using Microsoft.EntityFrameworkCore;
using testAblauf;

var builder = WebApplication.CreateBuilder(args);

var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Der Connectionstring ist falsch!");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));


var app = builder.Build();




if (app.Environment.IsDevelopment())
{
   
}



app.Run();



