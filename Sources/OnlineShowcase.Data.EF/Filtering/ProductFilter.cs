using System.Linq;
using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data.EF.Filtering
{
    public class ProductFilter : Filter<Product>
    {
        public int[] Categories { get; set; }

        public override IQueryable<Product> Apply(IQueryable<Product> query)
        {
            return base.Apply(query).Where(p => p.Categories.Select(c => c.Id).Intersect(this.Categories).Any());
        }
    }
}
