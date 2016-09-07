using OnlineShowcase.Core.Model;
using OnlineShowcase.Data;

namespace OnlineShowcase.Core.Services
{
    public class CategoryManager : DataManager<Category, Data.Model.Category>, ICategoryManager
    {
        public CategoryManager(ICategoryRepository repository) : base(repository, repository)
        {
        }

        protected override Category Map(Data.Model.Category entity)
        {
            throw new System.NotImplementedException();
        }

        protected override Data.Model.Category Map(Category model)
        {
            throw new System.NotImplementedException();
        }
    }
}
