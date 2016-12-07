using System;
using OnlineShowcase.Data.Filtering;
using OnlineShowcase.Data.EF.Extensions;
using System.Linq;
using System.Reflection;

namespace OnlineShowcase.Data.EF.Filtering
{
    public class Filter<T> : IFilter<T>
    {
        private PropertyInfo sortByProp;

        public int? Skip { get; set; }

        public int? Take { get; set; }

        public string SortBy
        {
            get { return this.sortByProp?.Name; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    return;
                }

                var propInfo = typeof (T).GetProperties()
                    .FirstOrDefault(p => p.Name.Equals(value, StringComparison.CurrentCultureIgnoreCase));

                if (propInfo == null)
                {
                    return;
                }

                this.sortByProp = propInfo;
            }
        }

        public bool SortAsc { get; set; }

        public virtual IQueryable<T> Apply(IQueryable<T> query)
        {
            return (string.IsNullOrEmpty(this.SortBy) ? query : query.OrderBy(this.SortBy, this.SortAsc)).Segment(this.Skip, this.Take);
        }
    }
}
