using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data
{
    public interface IProductRepository : ISafeProductRepository, IUnsafeProductRepository
    {
    }
}
