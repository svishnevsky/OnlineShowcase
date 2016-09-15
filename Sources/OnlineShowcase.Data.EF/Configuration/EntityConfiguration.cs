using Microsoft.EntityFrameworkCore;
using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data.EF.Configuration
{
    public abstract class EntityConfiguration<TEntity> : BaseConfiguration<TEntity> where TEntity : BaseModel
    {
        protected EntityConfiguration(ModelBuilder modelBuilder) : base(modelBuilder)
        {
        }

        public override void Map()
        {
            base.Map();

            var keyColumnName = $"{typeof(TEntity).Name}Id";

            this.Builder.Property(e => e.Id).HasColumnName(keyColumnName).UseSqlServerIdentityColumn();

            this.Builder
                .HasKey(e => e.Id).HasName(keyColumnName);
        }
    }
}
