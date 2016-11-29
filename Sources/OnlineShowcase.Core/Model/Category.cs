using System.Collections.Generic;

namespace OnlineShowcase.Core.Model
{
    public class Category
    {
        public int Id { get; set; }
        
        public string Name { get; set; }

        public int? ParentId { get; set; }

        public IEnumerable<Category> Children { get; set; }
    }
}
