using AutoMapper;
using OnlineShowcase.Core;
using OnlineShowcase.Web.Api.Model;
using OnlineShowcase.Web.Api.Controllers.Common;
using System.Threading.Tasks;
using OnlineShowcase.Core.Reactive.Events;
using OnlineShowcase.Core.Reactive;

namespace OnlineShowcase.Web.Api.Controllers
{
    public class ProductController : EntityController<Product, Core.Model.Product>
    {
        private readonly IEventStream eventStream;

        public ProductController(IProductManager productManager, IMapper mapper, IEventStream eventStream)
            : base(productManager, productManager, mapper)
        {
            this.eventStream = eventStream;
        }

        public override Task<Product> Get(int id)
        {
            this.eventStream.Push(new ProductViewEvent { ProductId = id });
            return base.Get(id);
        }
    }
}
