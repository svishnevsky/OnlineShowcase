using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data
{
    public interface IProductRepository : ISafeRepository<Product>, IUnsafeRepository<Product>
    {
    }
}
