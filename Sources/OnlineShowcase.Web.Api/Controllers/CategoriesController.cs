using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using OnlineShowcase.Core;
using OnlineShowcase.Web.Api.Model;

namespace OnlineShowcase.Web.Api.Controllers
{
    [Route("Categories")]
    [Authorize(Roles = "Contant Manager, Admin")]
    public class CategoriesController : Controller
    {
        private readonly ICategoryManager categoryManager;

        private readonly IMapper mapper;

        public CategoriesController(ICategoryManager categoryManager, IMapper mapper)
        {
            this.categoryManager = categoryManager;
            this.mapper = mapper;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IEnumerable<Category>> Get()
        {
            return (await this.categoryManager.Get()).Select(c => this.mapper.Map<Category>(c));
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody]Category model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await this.categoryManager.Add(this.mapper.Map<Core.Model.Category>(model));

            return Ok();
        }
    }
}
