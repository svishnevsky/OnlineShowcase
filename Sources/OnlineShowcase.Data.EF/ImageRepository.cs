using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data.EF
{
    public class ImageRepository : Repository<Image>, IImageRepository
    {
        public ImageRepository(DataContext context) : base(context)
        {
        }
    }
}
