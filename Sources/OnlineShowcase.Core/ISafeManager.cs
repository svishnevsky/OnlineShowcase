using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OnlineShowcase.Core
{
    public interface ISafeManager<T>
    {
        Task<IEnumerable<T>> Get();

        Task<T> Get(int id);
    }
}
