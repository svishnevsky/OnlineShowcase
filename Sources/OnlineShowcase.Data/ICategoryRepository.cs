using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data
{
    public interface ICategoryRepository : ISafeRepository<Category>, IUnsafeRepository<Category>
    {
    }
}
