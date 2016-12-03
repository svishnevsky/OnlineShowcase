using AutoMapper;

using OnlineShowcase.Web.Api.Model;
using OnlineShowcase.Core;
using OnlineShowcase.Web.Api.Controllers.Common;

namespace OnlineShowcase.Web.Api.Controllers
{
    public class ProductsController : EntitiesController<Product, Product, Core.Model.Product>
    {
        public ProductsController(IProductManager productManager, IMapper mapper)
            : base(productManager, productManager, mapper)
        {
        }
    }
}
