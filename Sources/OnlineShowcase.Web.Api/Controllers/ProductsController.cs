using AutoMapper;
using OnlineShowcase.Web.Api.Model;
using OnlineShowcase.Core;
using OnlineShowcase.Web.Api.Controllers.Common;

namespace OnlineShowcase.Web.Api.Controllers
{
    public class ProductsController : EntitiesController<Product, Core.Model.Product, Core.Filtering.ProductFilter>
    {
        public ProductsController(IProductManager productManager, IMapper mapper)
            : base(productManager, productManager, mapper)
        {
        }
    }
}
