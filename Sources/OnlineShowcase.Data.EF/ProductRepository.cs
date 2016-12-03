using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using OnlineShowcase.Data.Model;
using System.Data.SqlClient;

namespace OnlineShowcase.Data.EF
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(DataContext context) : base(context)
        {
        }

        public Task IncrementViewsCount(int productId, int increment)
        {
            return base.ExecSP("IncrementProductViews", new SqlParameter("@ProductId", productId), new SqlParameter("@Increment", increment));
        }

        protected override EntityEntry<Product> Attach(Product entity)
        {
            var entry = base.Attach(entity);
            entry.Property("ViewCount").IsModified = false;
            return entry;
        }
    }
}
