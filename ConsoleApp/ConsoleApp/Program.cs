using Newtonsoft.Json;
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

            dynamic dynJson = JsonConvert.DeserializeObject(scraping.SearchGameNews());
            foreach (var item in dynJson)
            {
                Console.WriteLine(item);
                Console.WriteLine();
            } 
        }
    }
}
