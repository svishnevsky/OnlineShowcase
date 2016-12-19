using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShowcase.Core;

namespace OnlineShowcase.Web.Api.Controllers.Common
{
    [Authorize(Roles = "Contant Manager, Admin")]
    public abstract class BaseEntityController<TViewModel, TDomainModel> : Controller
    {
        protected readonly ISafeManager<TDomainModel> SafeManager;
        protected readonly IUnsafeManager<TDomainModel> UnsafeManager;

        protected readonly IMapper Mapper;

        public string Name => this.GetType().Name.Replace("Controller", string.Empty);

        protected BaseEntityController(ISafeManager<TDomainModel> safeManager, IUnsafeManager<TDomainModel> unsafeManager, IMapper mapper)
        {
            this.SafeManager = safeManager;
            this.UnsafeManager = unsafeManager;
            this.Mapper = mapper;
        }
    }
}
