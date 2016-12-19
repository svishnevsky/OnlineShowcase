using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShowcase.Web.Api.Controllers.Common;
using OnlineShowcase.Web.Api.Services;
using System.Linq;
using OnlineShowcase.Core;

namespace OnlineShowcase.Web.Api.Controllers
{
    public class FilesController : EntitiesController<IFormFileCollection, Core.Model.File, Core.Filtering.FileFilter>
    {
        private readonly IFileProcessor fileProcessor;

        public FilesController(ISafeManager<Core.Model.File> safeManager, IUnsafeManager<Core.Model.File> unsafeManager, IMapper mapper, IFileProcessor fileProcessor, string entityRouteName = null)
            : base(safeManager, unsafeManager, mapper, entityRouteName)
        {
            this.fileProcessor = fileProcessor;
        }

        [AllowAnonymous]
        public override async Task<ActionResult> Post([FromForm]IFormFileCollection files)
        {
            var result = new List<int>(files.Count);

            foreach (var file in files)
            {
                var fileInfo = await this.fileProcessor.Process(file);
                result.Add(await this.UnsafeManager.Add(new Core.Model.File
                {
                    Name = fileInfo.Name,
                    Reference = Path.Combine(fileInfo.Path, fileInfo.Name),
                    Path = (string) RouteData.Values["path"] ?? "/"
                }));
            }

            return Ok(result);
        }
    }
}
