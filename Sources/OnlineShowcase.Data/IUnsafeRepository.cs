using System.Threading.Tasks;

namespace OnlineShowcase.Data
{
    public interface IUnsafeRepository<in T>
    {
        Task<int> Add(T entity);

        Task<int> Update(T entity);

        Task<int> Delete(int id);
    }
}
