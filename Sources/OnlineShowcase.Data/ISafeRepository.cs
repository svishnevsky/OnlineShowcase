using System.Threading.Tasks;

namespace OnlineShowcase.Data
{
    public interface ISafeRepository<T>
    {
        Task<T[]> Get();

        Task<T> Get(int id);
    }
}
