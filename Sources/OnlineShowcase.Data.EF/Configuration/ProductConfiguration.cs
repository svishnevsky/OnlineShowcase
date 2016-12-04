using Microsoft.EntityFrameworkCore;
using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data.EF.Configuration
{
    public class ProductConfiguration : EntityConfiguration<Product>
    {
        public ProductConfiguration(ModelBuilder modelBuilder) : base(modelBuilder)
        {
        }

        public override void Map()
        {
            base.Map();

            base.Builder.Property(p => p.Name).IsRequired().HasMaxLength(150);
            base.Builder.Property(p => p.Description).IsRequired().HasMaxLength(4000);
            base.Builder.Property(p => p.ViewCount).IsRequired().HasDefaultValue(0);

            base.Builder.Ignore(p => p.Categories);
        }
    }
}
