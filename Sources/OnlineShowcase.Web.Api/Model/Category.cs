using System.Collections.Generic;

namespace OnlineShowcase.Web.Api.Model
{
    public class Category
    {
        public int? Id { get; set; }

        public int? ParentId { get; set; }

        public string Name { get; set; }

        public IEnumerable<Category> Children { get; set; }
    }
}
