using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data.EF
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public CategoryRepository(DataContext context) : base(context)
        {
        }
    }
}
