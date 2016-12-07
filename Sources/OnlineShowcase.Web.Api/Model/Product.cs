using System.Collections.Generic;

namespace OnlineShowcase.Web.Api.Model
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int ViewCount { get; set; }

        public IEnumerable<Category> Categories { get; set; }
    }
}
