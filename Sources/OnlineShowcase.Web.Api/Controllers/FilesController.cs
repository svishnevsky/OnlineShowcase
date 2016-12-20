using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShowcase.Web.Api.Controllers.Common;
using OnlineShowcase.Web.Api.Services;
using OnlineShowcase.Core;

namespace OnlineShowcase.Web.Api.Controllers
{
    public class FilesController : EntitiesController<IFormFileCollection, int, Core.Model.File, Core.Filtering.FileFilter>
    {
        private readonly IFileProcessor fileProcessor;

        public FilesController(ISafeManager<Core.Model.File> safeManager, IUnsafeManager<Core.Model.File> unsafeManager, IMapper mapper, IFileProcessor fileProcessor, string entityRouteName = null)
            : base(safeManager, unsafeManager, mapper, entityRouteName)
        {
            this.fileProcessor = fileProcessor;
        }
        
        public override async Task<ActionResult> Post([FromForm]IFormFileCollection files)
        {
            var tasks = files.Select(this.ProcessFile);

            var result = await Task.WhenAll(tasks);

            return this.Ok(result);
        }

        private async Task<int> ProcessFile(IFormFile file)
        {
            var fileInfo = await this.fileProcessor.Process(file);
            return await this.UnsafeManager.Add(new Core.Model.File
            {
                Name = fileInfo.Name,
                Reference = Path.Combine(fileInfo.Path, fileInfo.Name),
                Path = (string)this.RouteData.Values["path"] ?? "/",
                MediaType = file.ContentType
            });
        }
    }
}
