using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OnlineShowcase.Data;

namespace OnlineShowcase.Core.Services
{
    public abstract class DataManager<TModel, TEntity> : ISafeManager<TModel>, IUnsafeManager<TModel> where TModel : class
    {
        private readonly ISafeRepository<TEntity> safeRepository;

        private readonly IUnsafeRepository<TEntity> unsafeRepository;

        protected DataManager(ISafeRepository<TEntity> safeRepository, IUnsafeRepository<TEntity> unsafeRepository)
        {
            this.safeRepository = safeRepository;
            this.unsafeRepository = unsafeRepository;
        }

        public virtual async Task<IEnumerable<TModel>> Get()
        {
            var result = await this.safeRepository.Get();

            return result?.Select(this.Map) ?? Enumerable.Empty<TModel>();
        }

        public virtual async Task<TModel> Get(int id)
        {
            var result = await this.safeRepository.Get(id);

            return this.Map(result);
        }

        public virtual async Task<int> Add(TModel model)
        {
            var entity = this.Map(model);

            return await this.unsafeRepository.Add(entity);
        }

        public virtual async Task<int> Update(TModel model)
        {
            var entity = this.Map(model);

            return await this.unsafeRepository.Update(entity);
        }

        public virtual async Task<int> Delete(int id)
        {
            return await this.unsafeRepository.Delete(id);
        }

        protected abstract TModel Map(TEntity entity);

        protected abstract TEntity Map(TModel model);
    }
}
