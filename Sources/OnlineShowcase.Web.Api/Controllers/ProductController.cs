using AutoMapper;
using OnlineShowcase.Core;
using OnlineShowcase.Web.Api.Model;
using OnlineShowcase.Web.Api.Controllers.Common;

namespace OnlineShowcase.Web.Api.Controllers
{
    public class ProductController : EntityController<Product, Core.Model.Product>
    {
        public ProductController(IProductManager productManager, IMapper mapper)
            : base(productManager, productManager, mapper)
        {
        }
    }
}
