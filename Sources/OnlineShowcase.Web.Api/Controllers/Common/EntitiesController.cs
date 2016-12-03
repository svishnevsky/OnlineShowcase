using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShowcase.Core;
using OnlineShowcase.Web.Api.Validation;
using Humanizer;

namespace OnlineShowcase.Web.Api.Controllers.Common
{
    public abstract class EntitiesController<TViewModel, TListViewModel, TDomainModel> : BaseEntityController<TViewModel, TDomainModel>
    {
        private readonly string entityRouteName;

        public EntitiesController(ISafeManager<TDomainModel> safeManager, IUnsafeManager<TDomainModel> unsafeManager, IMapper mapper, string entityRouteName = null)
            : base(safeManager, unsafeManager, mapper)
        {            
            this.entityRouteName = entityRouteName ?? this.Name.Singularize();
        }

        [HttpGet]
        [AllowAnonymous]
        [ActionName("Index")]
        public virtual async Task<IEnumerable<TListViewModel>> Get()
        {
            return (await this.SafeManager.Get()).Select(item => this.Mapper.Map<TListViewModel>(item));
        }

        [HttpPost]
        [ModelValidation]
        [ActionName("Index")]
        public virtual async Task<ActionResult> Post([FromBody]TViewModel model)
        {
            var id = await this.UnsafeManager.Add(this.Mapper.Map<TDomainModel>(model));

            var result = new { id };

            return this.CreatedAtRoute(this.entityRouteName, result, result);
        }
    }
}
