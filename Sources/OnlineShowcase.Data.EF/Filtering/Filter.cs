using OnlineShowcase.Data.Filtering;
using OnlineShowcase.Data.EF.Extensions;
using System.Linq;

namespace OnlineShowcase.Data.EF.Filtering
{
    public class Filter<T> : IFilter<T>
    {
        public int? Skip { get; set; }

        public int? Take { get; set; }

        public string SortBy { get; set; }

        public virtual IQueryable<T> Apply(IQueryable<T> query)
        {
            return query.OrderBy(this.SortBy).Segment(this.Skip, this.Take);
        }
    }
}
