using System.Linq;
using OnlineShowcase.Data.Model;
using OnlineShowcase.Data.EF.Configuration;

namespace OnlineShowcase.Data.EF.Filtering
{
    public class ProductFilter : Filter<Product>
    {
        public int[] Categories { get; set; }
        
        public IQueryable<Product> Apply(IQueryable<ProductCategory> query)
        {
            return base.Apply(this.Categories == null
                ? query.Select(pc => pc.Product)
                : query.Where(pc => this.Categories.Contains(pc.CategoryId)).Select(pc => pc.Product)).Distinct();
        }
    }
}
