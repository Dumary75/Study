
namespace MyApp
{
    internal class Program
    {
        static void Main(string[] args)
        {

            int birthYear = 2026;

            Console.WriteLine("Trägst du Alter hier ein!");
            string age = Console.ReadLine();

            Console.WriteLine(birthYear - int.Parse(age));
        }
    }
} 