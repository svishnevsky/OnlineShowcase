using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using OnlineShowcase.Data.Model;
using System.Data.SqlClient;
using OnlineShowcase.Data.EF.Configuration;
using System.Linq;

namespace OnlineShowcase.Data.EF
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(DataContext context) : base(context)
        {
        }

        public async override Task<Product> Get(int id)
        {
            var product = await base.Get(id);
            var categories = base.Context.Set<ProductCategory>().Where(pc => pc.ProductId == id).Select(pc => pc.Category).ToList();
            
            product.Categories = categories;

            return product;
        }

        public async override Task<Product[]> Get()
        {
            var products = await base.Get();

            var productIds = products.Select(p => p.Id).ToArray();
            
            var categories = base.Context.Set<ProductCategory>()
                .Where(pc => productIds.Contains(pc.ProductId))
                .Select(pc => new { pc.ProductId, pc.Category })
                .GroupBy(pc => pc.ProductId)
                .ToDictionary(g => g.Key, g => g.Select(c => c.Category).ToList());

            foreach (var product in products)
            {
                if (categories.ContainsKey(product.Id))
                {
                    product.Categories = categories[product.Id];
                }
            }

            return products;
        }

        public async Task IncrementViewsCount(int productId, int increment)
        {
            await base.ExecSP("IncrementProductViews", new SqlParameter("@ProductId", productId), new SqlParameter("@Increment", increment));
        }

        protected override EntityEntry<Product> Attach(Product entity)
        {
            var entry = base.Attach(entity);
            entry.Property("ViewCount").IsModified = false;
            return entry;
        }
    }
}
