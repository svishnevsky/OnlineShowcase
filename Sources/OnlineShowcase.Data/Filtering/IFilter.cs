using System.Linq;

namespace OnlineShowcase.Data.Filtering
{
    public interface IFilter<TEntity>
    {
        int? Skip { get; set; }

        int? Take { get; set; }

        IQueryable<TEntity> Apply(IQueryable<TEntity> query);
    }
}
