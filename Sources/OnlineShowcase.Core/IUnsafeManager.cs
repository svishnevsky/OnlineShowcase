using System.Threading.Tasks;

namespace OnlineShowcase.Core
{
    public interface IUnsafeManager<in T>
    {
        Task<int> Add(T entity);

        Task<int> Update(T entity);

        Task<int> Delete(int id);
    }
}
