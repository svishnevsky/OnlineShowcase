using System.Collections.Generic;

namespace OnlineShowcase.Core.Model
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int ViewCount { get; set; }

        public int? ImageId { get; set; }

        public IEnumerable<Category> Categories { get; set; }
    }
}
