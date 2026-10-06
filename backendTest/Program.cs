
using Scalar.AspNetCore;
using Microsoft.EntityFrameworkCore;
using testAblauf;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddOpenApi();

var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Der Connectionstring ist falsch!");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));


var app = builder.Build();

app.MapUserEndpoints();


if (app.Environment.IsDevelopment())
{

    app.MapOpenApi();
    app.MapScalarApiReference();
   
}






app.Run();



