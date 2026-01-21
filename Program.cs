
namespace MyApp
{
    internal class Program
    {
        static void Main(string[] args)
        {


            var bsp = new List<int> {1,2,3};

            Console.WriteLine("Ohne adden: " + bsp);

            bsp.Add(27);

            Console.WriteLine("Einfach: " + bsp);

            bsp.Remove(27);

            Console.WriteLine("Gefiltert: " + bsp);

            bool test = bsp.Contains(3);

            Console.WriteLine("Hat die 3?: " + test);



        }
    }
} 