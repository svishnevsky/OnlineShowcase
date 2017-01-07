using AutoMapper;
using OnlineShowcase.Core;
using OnlineShowcase.Web.Api.Model;
using OnlineShowcase.Web.Api.Controllers.Common;

namespace OnlineShowcase.Web.Api.Controllers
{
    public class CategoryController : EntityController<Category, Core.Model.Category>
    {
        public CategoryController(ICategoryManager categoryManager, IMapper mapper)
            : base(categoryManager, categoryManager, mapper)
        {
        }
    }
}
