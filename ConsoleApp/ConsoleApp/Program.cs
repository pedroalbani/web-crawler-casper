using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Connectors.G1GamesScraping scraping = new Connectors.G1GamesScraping();
            Console.WriteLine(scraping.SearchGameNews());
        }
    }
}
