using System.Collections.Generic;

namespace OnlineShowcase.Web.Api.Model
{
    public class Filter
    {
        public int? Skip { get; set; }

        public int? Take { get; set; }

        public string SortBy { get; set; }

        public bool SortAsc { get; set; }

        public Dictionary<string, string> PropertyFilters { get; set; }
    }
}
