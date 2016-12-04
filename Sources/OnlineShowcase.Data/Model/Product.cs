using System.Collections.Generic;

namespace OnlineShowcase.Data.Model
{
    public class Product : BaseModel
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public int ViewCount { get; set; }

        public IEnumerable<Category> Categories { get; set; }
    }
}
