using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using OnlineShowcase.Web.Api.Model;
using OnlineShowcase.Web.Api.Validation;
using OnlineShowcase.Core;

namespace OnlineShowcase.Web.Api.Controllers
{
    [Route("Products")]
    [Authorize(Roles = "Contant Manager, Admin")]
    public class ProductsController : Controller
    {
        private readonly IProductManager productManager;

        private readonly IMapper mapper;

        public ProductsController(IProductManager productManager, IMapper mapper)
        {
            this.productManager = productManager;
            this.mapper = mapper;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IEnumerable<Product>> Get()
        {
            return (await this.productManager.Get()).Select(c => this.mapper.Map<Product>(c));
        }

        [HttpPost]
        [ModelValidation]
        public async Task<ActionResult> Post([FromBody]Product model)
        {
            var id = await this.productManager.Add(this.mapper.Map<Core.Model.Product>(model));

            var result = new { id = id };

            return this.CreatedAtRoute("Product", result, result);
        }
    }
}
