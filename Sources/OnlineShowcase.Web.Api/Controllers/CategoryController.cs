using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShowcase.Core;
using OnlineShowcase.Web.Api.Model;

namespace OnlineShowcase.Web.Api.Controllers
{
    [Route("Categories/{id:int}")]
    [Authorize(Roles = "ContentManager,Admin")]
    public class CategoryController : Controller
    {
        private readonly ICategoryManager categoryManager;

        private readonly IMapper mapper;

        public CategoryController(ICategoryManager categoryManager, IMapper mapper)
        {
            this.categoryManager = categoryManager;
            this.mapper = mapper;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<Category> Get(int id)
        {
            return this.mapper.Map<Category>(await this.categoryManager.Get(id));
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody]Category model)
        {
            await this.categoryManager.Update(mapper.Map<Core.Model.Category>(model));

            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            await this.categoryManager.Delete(id);

            return Ok();
        }
    }
}
