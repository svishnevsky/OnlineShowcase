using AutoMapper;
using OnlineShowcase.Core.Model;
using OnlineShowcase.Data;

namespace OnlineShowcase.Core.Services
{
    public class ImageManager : DataManager<Image, Data.Model.Image>, IImageManager
    {
        public ImageManager(IImageRepository repository, IMapper mapper) : base(repository, repository, mapper)
        {
        }
    }
}
