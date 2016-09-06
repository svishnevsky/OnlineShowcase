using Humanizer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data.EF.Configuration
{
    public abstract class BaseModelConfiguration<TEntity> : IEntityMappingConfiguration where TEntity : BaseModel
    {
        private readonly ModelBuilder modelBuilder;

        protected EntityTypeBuilder<TEntity> Builder => modelBuilder.Entity<TEntity>();

        protected BaseModelConfiguration(ModelBuilder modelBuilder)
        {
            this.modelBuilder = modelBuilder;
        }

        public virtual void Map()
        {
            this.Builder
                .ToTable(typeof(TEntity).Name.Pluralize())
                .HasKey(e => e.Id).HasName($"{typeof(TEntity).Name}Id");
        }
    }
}
