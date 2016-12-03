using Microsoft.EntityFrameworkCore.ChangeTracking;
using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data.EF
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(DataContext context) : base(context)
        {
        }

        protected override EntityEntry<Product> Attach(Product entity)
        {
            var entry = base.Attach(entity);
            entry.Property("ViewCount").IsModified = false;
            return entry;
        }
    }
}
