using AutoMapper;
using OnlineShowcase.Core.Model;
using OnlineShowcase.Data;

namespace OnlineShowcase.Core.Services
{
    public class FileManager : DataManager<File, Data.Model.File>, IFileManager
    {
        public FileManager(IImageRepository repository, IMapper mapper) : base(repository, repository, mapper)
        {
        }
    }
}
