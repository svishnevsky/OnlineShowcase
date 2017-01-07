using Microsoft.EntityFrameworkCore;
using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data.EF.Configuration
{
    public class CategoryConfiguration : EntityConfiguration<Category>
    {
        public CategoryConfiguration(ModelBuilder modelBuilder) : base(modelBuilder)
        {
        }

        public override void Map()
        {
            base.Map();

            base.Builder.HasOne(typeof(Category)).WithMany().HasForeignKey("ParentId").IsRequired(false);
            base.Builder.Property(p => p.Name).IsRequired().HasMaxLength(50);
        }
    }
}
