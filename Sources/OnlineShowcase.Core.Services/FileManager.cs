using System.Threading.Tasks;

using AutoMapper;

using OnlineShowcase.Core.Model;
using OnlineShowcase.Data;

namespace OnlineShowcase.Core.Services
{
    public class FileManager : DataManager<File, Data.Model.File>, IFileManager
    {
        private readonly IFileProcessor fileProcessor;

        public FileManager(IImageRepository repository, IMapper mapper, IFileProcessor fileProcessor) : base(repository, repository, mapper)
        {
            this.fileProcessor = fileProcessor;
        }

        public override async Task<int> Add(File model)
        {
            var fileInfo = await this.fileProcessor.Process(model.FileStream);
            
            model = this.Mapper.Map(fileInfo, model);

            return await base.Add(model);
        }
    }
}
