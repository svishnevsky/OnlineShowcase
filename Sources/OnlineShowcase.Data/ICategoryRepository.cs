using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data
{
    public interface ICategoryRepository : ISafeCategoryRepository, IUnsafeCategoryRepository
    {
    }
}
