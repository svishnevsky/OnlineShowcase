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

            this.Builder
                .HasKey(e => e.Id).HasName($"{typeof(TEntity).Name}Id");
        }
    }
}
