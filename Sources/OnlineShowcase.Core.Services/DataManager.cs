using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using OnlineShowcase.Data;

namespace OnlineShowcase.Core.Services
{
    public abstract class DataManager<TModel, TEntity> : ISafeManager<TModel>, IUnsafeManager<TModel> where TModel : class
    {
        private readonly ISafeRepository<TEntity> safeRepository;

        private readonly IUnsafeRepository<TEntity> unsafeRepository;

        private readonly IMapper mapper;

        protected DataManager(ISafeRepository<TEntity> safeRepository, IUnsafeRepository<TEntity> unsafeRepository, IMapper mapper)
        {
            this.safeRepository = safeRepository;
            this.unsafeRepository = unsafeRepository;
            this.mapper = mapper;
        }

        public virtual async Task<IEnumerable<TModel>> Get()
        {
            var result = await this.safeRepository.Get();

            return result?.Select(e => this.mapper.Map<TModel>(e)) ?? Enumerable.Empty<TModel>();
        }

        public virtual async Task<TModel> Get(int id)
        {
            var result = await this.safeRepository.Get(id);

            return this.mapper.Map<TModel>(result);
        }

        public virtual async Task<int> Add(TModel model)
        {
            var entity = this.mapper.Map<TEntity>(model);

            return await this.unsafeRepository.Add(entity);
        }

        public virtual async Task<int> Update(TModel model)
        {
            var entity = this.mapper.Map<TEntity>(model);

            return await this.unsafeRepository.Update(entity);
        }

        public virtual async Task<int> Delete(int id)
        {
            return await this.unsafeRepository.Delete(id);
        }
    }
}
