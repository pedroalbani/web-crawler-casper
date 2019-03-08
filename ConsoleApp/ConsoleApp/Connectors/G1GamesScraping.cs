using ConsoleApp.Helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp.Connectors
{
    class G1GamesScraping
    {
        public string SearchGameNews()
        {
            bool captureSreenshot = true;

            string[] parameters = new string[] { "g1GameCrawl.js", captureSreenshot.ToString() };

            string json = CasperJsHelper.RunProcess(parameters, "g1GameData.js", "g1GamesScraping");

            return json;
        }
    }
}
