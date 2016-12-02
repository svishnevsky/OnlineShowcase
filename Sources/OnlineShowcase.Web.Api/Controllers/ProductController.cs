using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShowcase.Core;
using OnlineShowcase.Web.Api.Model;

namespace OnlineShowcase.Web.Api.Controllers
{
    [Route("Products/{id:int}", Name = "Product")]
    [Authorize(Roles = "ContentManager,Admin")]
    public class ProductController : Controller
    {
        private readonly IProductManager productManager;

        private readonly IMapper mapper;

        public ProductController(IProductManager productManager, IMapper mapper)
        {
            this.productManager = productManager;
            this.mapper = mapper;
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody]Product model)
        {
            await this.productManager.Update(this.mapper.Map<Core.Model.Product>(model));

            return this.Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            await this.productManager.Delete(id);

            return this.Ok();
        }
    }
}
