using Humanizer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace OnlineShowcase.Data.EF.Configuration
{
    public abstract class BaseConfiguration<TEntity> : IEntityMappingConfiguration where TEntity : class
    {
        private readonly ModelBuilder modelBuilder;

        protected EntityTypeBuilder<TEntity> Builder => modelBuilder.Entity<TEntity>();

        protected BaseConfiguration(ModelBuilder modelBuilder)
        {
            this.modelBuilder = modelBuilder;
        }

        public virtual void Map()
        {
            this.Builder
                .ToTable(typeof(TEntity).Name.Pluralize());
        }
    }
}
