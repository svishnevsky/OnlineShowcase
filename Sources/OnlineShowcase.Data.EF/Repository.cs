using System;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using LinqKit;
using Microsoft.EntityFrameworkCore;
using OnlineShowcase.Data.Model;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Data.SqlClient;
using OnlineShowcase.Data.Filtering;

namespace OnlineShowcase.Data.EF
{
    public abstract class Repository<TEntity> : ISafeRepository<TEntity>, IUnsafeRepository<TEntity> where TEntity : BaseModel
    {
        protected readonly DataContext Context;

        protected IQueryable<TEntity> Query => this.Context.Set<TEntity>().AsExpandable();

        protected Repository(DataContext context)
        {
            this.Context = context;
        }

        public virtual async Task<TEntity[]> Get(IFilter<TEntity> filter = null)
        {
            return await (filter == null ? this.Query : filter.Apply(this.Query)).ToArrayAsync();
        }

        public virtual async Task<TEntity> Get(int id)
        {
            return await this.Query.FirstOrDefaultAsync(e => e.Id == id);
        }

        public virtual async Task<int> Add(TEntity entity)
        {
            var entry = this.Context.Set<TEntity>().Add(entity).Entity;
            await this.SaveChanges();

            return entry.Id;
        }

        public virtual async Task<int> Update(TEntity entity)
        {
            var entry = this.Attach(entity);
            entry.Property("Created").IsModified = false;

            return await this.SaveChanges();
        }

        public virtual async Task<int> Delete(int id)
        {
            var entity = await this.Get(id);

            if (entity == null)
            {
                return 0;
            }

            this.Context.Set<TEntity>().Remove(entity);

            return await this.SaveChanges();
        }

        protected virtual EntityEntry<TEntity> Attach(TEntity entity)
        {
            var entry = this.Context.Attach(entity);
            entry.State = EntityState.Modified;

            return entry;
        }

        // ReSharper disable once InconsistentNaming
        protected async Task<int> ExecSP(string name, params SqlParameter[] parameters)
        {
            var paramNames = string.Join(", ", parameters.Select(p => p.ParameterName));
            return await this.Context.Database.ExecuteSqlCommandAsync($"{name} {paramNames}", parameters: parameters);
        }

        // ReSharper disable once InconsistentNaming
        protected async Task<T> ExecSP<T>(string name, Func<DbDataReader, T> reader = null, params SqlParameter[] parameters)
        {
            using (var command = this.Context.Database.GetDbConnection().CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = name;
                command.Parameters.AddRange(parameters);

                command.Connection.Open();

                T result;

                if (reader == null)
                {
                    await command.ExecuteNonQueryAsync();
                    result = default(T);
                }
                else
                {
                    using (var dbReader = await command.ExecuteReaderAsync())
                    {
                        result = reader(dbReader);
                    }
                }

                command.Connection.Close();

                return result;
            }
        }

        protected async Task<int> SaveChanges()
        {
            return await this.Context.SaveChangesAsync();
        }
    }
}
