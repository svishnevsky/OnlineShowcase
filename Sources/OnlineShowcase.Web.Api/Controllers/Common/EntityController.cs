using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OnlineShowcase.Core;
using OnlineShowcase.Web.Api.Validation;
using Microsoft.AspNetCore.Authorization;

namespace OnlineShowcase.Web.Api.Controllers.Common
{
    public class EntityController<TViewModel, TDomainModel> : BaseEntityController<TViewModel, TDomainModel>
    {
        public EntityController(ISafeManager<TDomainModel> safeManager, IUnsafeManager<TDomainModel> unsafeManager, IMapper mapper)
            : base(safeManager, unsafeManager, mapper)
        {
        }

        [HttpGet]
        [ModelValidation]
        [ActionName("Index")]
        [AllowAnonymous]
        public virtual async Task<TViewModel> Get(int id)
        {
            return this.Mapper.Map<TDomainModel, TViewModel>(await this.SafeManager.Get(id));
        }

        [HttpPut]
        [ModelValidation]
        [ActionName("Index")]
        public virtual async Task<ActionResult> Put([FromBody]TViewModel model)
        {
            await this.UnsafeManager.Update(this.Mapper.Map<TDomainModel>(model));

            return Ok();
        }

        [HttpDelete]
        [ActionName("Index")]
        public virtual async Task<ActionResult> Delete(int id)
        {
            await this.UnsafeManager.Delete(id);

            return this.Ok();
        }
    }
}
