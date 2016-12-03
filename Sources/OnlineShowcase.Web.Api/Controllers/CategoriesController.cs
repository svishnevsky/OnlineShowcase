using AutoMapper;
using OnlineShowcase.Core;
using OnlineShowcase.Web.Api.Model;
using OnlineShowcase.Web.Api.Controllers.Common;

namespace OnlineShowcase.Web.Api.Controllers
{
    public class CategoriesController : EntitiesController<Category, Category, Core.Model.Category>
    {
        private readonly ICategoryManager categoryManager;

        private readonly IMapper mapper;

        public CategoriesController(ICategoryManager categoryManager, IMapper mapper) : base(categoryManager, categoryManager, mapper)
        {
            this.categoryManager = categoryManager;
            this.mapper = mapper;
        }
    }
}
