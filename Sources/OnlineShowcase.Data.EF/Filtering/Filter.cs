using System;
using OnlineShowcase.Data.Filtering;
using OnlineShowcase.Data.EF.Extensions;
using System.Linq;
using System.Reflection;

namespace OnlineShowcase.Data.EF.Filtering
{
    public class Filter<T> : IFilter<T>
    {
        private string sortBy;

        public int? Skip { get; set; }

        public int? Take { get; set; }

        public string SortBy
        {
            get { return this.sortBy; }
            set
            {
                if (typeof (T).GetProperties().All(p => p.Name != value))
                {
                    throw new ArgumentException($"Type \"{typeof(T).Name}\" doesn't contains property {value}.");
                }

                this.sortBy = value;
            }
        }

        public bool SortAsc { get; set; }

        public virtual IQueryable<T> Apply(IQueryable<T> query)
        {
            return query.OrderBy(this.SortBy, this.SortAsc).Segment(this.Skip, this.Take);
        }
    }
}
