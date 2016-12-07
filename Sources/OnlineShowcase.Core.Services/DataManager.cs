using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using OnlineShowcase.Core.Filtering;
using OnlineShowcase.Data;
using OnlineShowcase.Data.Filtering;

namespace OnlineShowcase.Core.Services
{
    public abstract class DataManager<TModel, TEntity> : ISafeManager<TModel>, IUnsafeManager<TModel> where TModel : class
    {
        protected readonly ISafeRepository<TEntity> SafeRepository;

        protected readonly IUnsafeRepository<TEntity> UnsafeRepository;

        protected readonly IMapper Mapper;

        protected DataManager(ISafeRepository<TEntity> safeRepository, IUnsafeRepository<TEntity> unsafeRepository, IMapper mapper)
        {
            this.SafeRepository = safeRepository;
            this.UnsafeRepository = unsafeRepository;
            this.Mapper = mapper;
        }

        public virtual async Task<IEnumerable<TModel>> Get<TFilter>(TFilter filter = null) where TFilter : Filter
        {
            var result = await this.SafeRepository.Get(this.Mapper.Map<TFilter, IFilter<TEntity>>(filter));

            return result?.Select(e => this.Mapper.Map<TModel>(e)) ?? Enumerable.Empty<TModel>();
        }

        public virtual async Task<TModel> Get(int id)
        {
            var result = await this.SafeRepository.Get(id);

            return this.Mapper.Map<TModel>(result);
        }

        public virtual async Task<int> Add(TModel model)
        {
            var entity = this.Mapper.Map<TEntity>(model);

            return await this.UnsafeRepository.Add(entity);
        }

        public virtual async Task<int> Update(TModel model)
        {
            var entity = this.Mapper.Map<TEntity>(model);

            return await this.UnsafeRepository.Update(entity);
        }

        public virtual async Task<int> Delete(int id)
        {
            return await this.UnsafeRepository.Delete(id);
        }
    }
}
