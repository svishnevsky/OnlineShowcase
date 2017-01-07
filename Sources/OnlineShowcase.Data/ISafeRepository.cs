using OnlineShowcase.Data.Filtering;
using System.Threading.Tasks;

namespace OnlineShowcase.Data
{
    public interface ISafeRepository<T>
    {
        Task<T[]> Get(IFilter<T> filter = null);

        Task<T> Get(int id);
    }
}
