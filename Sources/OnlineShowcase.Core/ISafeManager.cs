using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineShowcase.Core.Filtering;

namespace OnlineShowcase.Core
{
    public interface ISafeManager<T>
    {
        Task<IEnumerable<T>> Get<TFilter>(TFilter filter = null) where TFilter : Filter;

        Task<T> Get(int id);
    }
}
