using System.Linq;
using System.Threading.Tasks;
using LinqKit;
using Microsoft.EntityFrameworkCore;
using OnlineShowcase.Data.Model;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace OnlineShowcase.Data.EF
{
    public abstract class Repository<TEntity> : ISafeRepository<TEntity>, IUnsafeRepository<TEntity> where TEntity : BaseModel
    {
        private readonly DataContext context;

        protected IQueryable<TEntity> Query => this.context.Set<TEntity>().AsExpandable();

        protected Repository(DataContext context)
        {
            this.context = context;
        }

        public virtual async Task<TEntity[]> Get()
        {
            return await this.Query.ToArrayAsync();
        }

        public virtual async Task<TEntity> Get(int id)
        {
            return await this.Query.FirstOrDefaultAsync(e => e.Id == id);
        }

        public virtual async Task<int> Add(TEntity entity)
        {
            var entry = this.context.Set<TEntity>().Add(entity).Entity;
            await this.context.SaveChangesAsync();

            return entry.Id;
        }

        public virtual async Task<int> Update(TEntity entity)
        {
            var entry = this.Attach(entity);

            return await this.context.SaveChangesAsync();
        }

        public virtual async Task<int> Delete(int id)
        {
            var entity = await this.Get(id);

            if (entity == null)
            {
                return 0;
            }

            this.context.Set<TEntity>().Remove(entity);

            return await this.context.SaveChangesAsync();
        }

        protected virtual EntityEntry<TEntity> Attach(TEntity entity)
        {
            var entry = this.context.Attach(entity);
            entry.State = EntityState.Modified;

            return entry;
        }
    }
}
