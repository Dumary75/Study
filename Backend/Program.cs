
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.VisualBasic;

var builder = WebApplication.CreateBuilder(args);

// Hier definieren wir eine Richtlinie namens "AllowReactApp"
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Hier den Port deines Frontends
              .AllowAnyMethod()                     // Erlaubt GET, POST, etc.
              .AllowAnyHeader();                    // Erlaubt alle Header
    });
});

builder.Services.AddHttpClient("TestClient", client =>
{

    client.BaseAddress = new Uri("https:beispie.de");

    
});


builder.Services.AddHttpClient("WeatherAPI", client =>
{
    client.BaseAddress = new Uri("https://api.weatherprovider.com/");
});


builder.Services.AddTransient<MeineCustomMiddleware>();

var app = builder.Build();

app.UseCors("AllowReactApp");





// Hier definierst du deine Routen
app.MapGet("/testo", async (HttpContext context) => {
    await context.Response.WriteAsync(context.Request.QueryString.ToString());


}).AddEndpointFilter((async (context, next) =>
{

 System.Console.WriteLine("Filter greift, VOR durchgeben");

 var result = await next(context);

return result;

    
}));

app.UseWhen(context => context.Request.Path.StartsWithSegments("/arbeiter"), subApp => 
{
    // 2. ...dann schalte hier VORHER deine Custom Middleware dazwischen
    subApp.UseMiddleware<MeineCustomMiddleware>();
});

app.MapGet("/arbeiter", () => 
{
    // Hol dir die Daten aus deinem Repository
    var alleArbeiter = EmployeesRepository.GetEmployees(); // (Musst du natürlich passend benennen)



    // Gib sie direkt als JSON zurück
    return Results.Ok(alleArbeiter); 
});

app.MapPost("/arbeiter", Results<Created<Employee> ,BadRequest<string>> (Employee emp) => 
{
    // Wir prüfen direkt das emp-Objekt (nicht dto.Employee, da das Objekt ja emp heißt)
    if (string.IsNullOrEmpty(emp.Name))
    {
        // BadRequest gibt einen Status 400 zurück und kann einen einfachen String (oder ein Objekt) transportieren
        return TypedResults.BadRequest("Der Name fehlt!");
    }

    EmployeesRepository.AddEmployee(emp);
    return TypedResults.Created($"/arbeiter/{emp.Id}", emp); 
});






// Erst ganz am Ende starten
app.Run(); 



static class EmployeesRepository
{
    private static  List<Employee> employees = new List<Employee>
    {
        new Employee(1,"John Ratsch", "Irgendwas", 35000),
        new Employee(2,"MnopoloMan rich", "Jefe", 190000)  
    };

    public static List<Employee> GetEmployees() => employees;

    public static void AddEmployee(Employee newEmp) => employees.Add(newEmp);

}


public class Employee
{
    
public int Id {get; set;}  
public string  Name {get; set;}
public string Position {get; set;}
public double Salary {get; set;}



public Employee (int id, string name, string position, double salary){

     Id = id;
     Name = name;
     Position = position;
     Salary = salary;


    }

};