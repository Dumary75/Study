
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

var app = builder.Build();

app.UseCors("AllowReactApp");

app.Use(async (context, next) =>
{
    
    System.Console.WriteLine("Anfrage kommt rein");

    await next();

    System.Console.WriteLine("Und Teil 2");

});


// Hier definierst du deine Routen
app.MapGet("/testo", async (HttpContext context) => {
    await context.Response.WriteAsync(context.Request.QueryString.ToString());
});

app.MapGet("/arbeiter", () => 
{
    // Hol dir die Daten aus deinem Repository
    var alleArbeiter = EmployeesRepository.GetEmployees(); // (Musst du natürlich passend benennen)

    // Gib sie direkt als JSON zurück
    return Results.Ok(alleArbeiter); 
});

app.MapPost("/arbeiter", (Employee emp) => 
{
    EmployeesRepository.AddEmployee(emp);
    return Results.Created($"/arbeiter/{emp.Id}", emp); // 201 Created als Antwort
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
public string Name {get; set;}
public string Position {get; set;}
public double Salary {get; set;}



public Employee (int id, string name, string position, double salary){

     Id = id;
     Name = name;
     Position = position;
     Salary = salary;


    }

};