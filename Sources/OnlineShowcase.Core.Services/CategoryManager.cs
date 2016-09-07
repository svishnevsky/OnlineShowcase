using AutoMapper;
using OnlineShowcase.Core.Model;
using OnlineShowcase.Data;

namespace OnlineShowcase.Core.Services
{
    public class CategoryManager : DataManager<Category, Data.Model.Category>, ICategoryManager
    {
        public CategoryManager(ICategoryRepository repository, IMapper mapper) : base(repository, repository, mapper)
        {
        }
    }
}
