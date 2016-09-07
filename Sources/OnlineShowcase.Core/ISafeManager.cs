using System.Threading.Tasks;

namespace OnlineShowcase.Core
{
    public interface ISafeManager<T>
    {
        Task<T[]> Get();

        Task<T> Get(int id);
    }
}
