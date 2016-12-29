using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShowcase.Web.Api.Controllers.Common;
using OnlineShowcase.Core;

namespace OnlineShowcase.Web.Api.Controllers
{
    public class FilesController : EntitiesController<IFormFileCollection, int, Core.Model.File, Core.Filtering.FileFilter>
    {
        public FilesController(ISafeManager<Core.Model.File> safeManager, IUnsafeManager<Core.Model.File> unsafeManager, IMapper mapper, string entityRouteName = null)
            : base(safeManager, unsafeManager, mapper, entityRouteName)
        {
        }
        
        public override async Task<ActionResult> Post([FromForm]IFormFileCollection files)
        {
            var tasks = files.Select(this.ProcessFile);

            var result = await Task.WhenAll(tasks);

            return this.Ok(result);
        }

        private async Task<int> ProcessFile(IFormFile file)
        {
            using (var fileModel = new Core.Model.File
                                  {
                                      Path = (string)this.RouteData.Values["path"] ?? "/",
                                      MediaType = file.ContentType,
                                      FileStream = file.OpenReadStream()
                                  })
            {
                return await this.UnsafeManager.Add(fileModel);
            }
        }
    }
}
