using AutoMapper;
using OnlineShowcase.Core;
using OnlineShowcase.Web.Api.Model;
using OnlineShowcase.Web.Api.Controllers.Common;

namespace OnlineShowcase.Web.Api.Controllers
{
    public class CategoriesController : EntitiesController<Category, Category, Core.Model.Category, Core.Filtering.Filter>
    {
        public CategoriesController(ICategoryManager categoryManager, IMapper mapper) : base(categoryManager, categoryManager, mapper)
        {
        }
    }
}
