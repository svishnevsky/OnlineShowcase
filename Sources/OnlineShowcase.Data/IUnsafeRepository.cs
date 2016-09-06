using System.Threading.Tasks;

namespace OnlineShowcase.Data
{
    public interface IUnsafeRepository<in T>
    {
        Task<int> Add(T category);

        Task<bool> Update(T category);

        Task<bool> Delete();
    }
}
