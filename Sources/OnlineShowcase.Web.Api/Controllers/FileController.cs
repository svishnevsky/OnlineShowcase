using System.Threading.Tasks;

using AutoMapper;

using Microsoft.AspNetCore.Mvc;

using OnlineShowcase.Core;
using OnlineShowcase.Web.Api.Model;
using OnlineShowcase.Web.Api.Controllers.Common;

namespace OnlineShowcase.Web.Api.Controllers
{
    public class FileController : EntityController<object, Core.Model.File>
    {
        public FileController(IFileManager fileManager, IMapper mapper)
            : base(fileManager, fileManager, mapper)
        {
        }

        public override async Task<ActionResult> Put(object model)
        {
            return await Task.FromResult(this.StatusCode(405));
        }

        public override async Task<object> Get(int id)
        {
            var fileInfo = await base.SafeManager.Get(id);

            if (fileInfo == null)
            {
                return this.NotFound();
            }

            return this.PhysicalFile(fileInfo.Reference, fileInfo.MediaType);
        }
    }
}
