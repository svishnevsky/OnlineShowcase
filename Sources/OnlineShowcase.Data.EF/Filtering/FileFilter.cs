using System.Linq;
using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data.EF.Filtering
{
    public class FileFilter : Filter<File>
    {
        public string Path { get; set; }

        public override IQueryable<File> Apply(IQueryable<File> query)
        {
            return base.Apply(string.IsNullOrEmpty(this.Path) ? query : query.Where(i => i.Path == this.Path));
        }
    }
}
