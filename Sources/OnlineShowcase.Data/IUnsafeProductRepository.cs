using System.Threading.Tasks;
using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data
{
    public interface IUnsafeProductRepository : IUnsafeRepository<Product>
    {
        Task IncrementViewsCount(int productId, int increment);
    }
}
