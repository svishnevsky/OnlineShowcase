using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data.EF
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(DataContext context) : base(context)
        {
        }
    }
}
