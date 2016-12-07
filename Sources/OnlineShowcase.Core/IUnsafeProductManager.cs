using OnlineShowcase.Core.Model;
using System.Threading.Tasks;

namespace OnlineShowcase.Core
{
    public interface IUnsafeProductManager : IUnsafeManager<Product>
    {
        Task IncrementViewsCount(int productId, int increment);
    }
}
