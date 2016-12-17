using System.Linq;
using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data.EF.Filtering
{
    public class ImageFilter : Filter<Image>
    {
        public string Path { get; set; }

        public override IQueryable<Image> Apply(IQueryable<Image> query)
        {
            return base.Apply(string.IsNullOrEmpty(this.Path) ? query : query.Where(i => i.Path == this.Path));
        }
    }
}
