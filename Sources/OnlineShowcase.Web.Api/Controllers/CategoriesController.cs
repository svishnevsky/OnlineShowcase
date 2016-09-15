using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineShowcase.Core;
using OnlineShowcase.Core.Model;

namespace OnlineShowcase.Web.Api.Controllers
{
    [Route("Categories")]
    public class CategoriesController : Controller
    {
        private readonly ICategoryManager categoryManager;

        public CategoriesController(ICategoryManager categoryManager)
        {
            this.categoryManager = categoryManager;
        }

        [HttpGet]
        public async Task<IEnumerable<Category>> Get()
        {
            return await this.categoryManager.Get();
        }
    }
}
