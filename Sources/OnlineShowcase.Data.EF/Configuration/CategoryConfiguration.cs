using Microsoft.EntityFrameworkCore;
using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data.EF.Configuration
{
    public class CategoryConfiguration : BaseModelConfiguration<Category>
    {
        public CategoryConfiguration(ModelBuilder modelBuilder) : base(modelBuilder)
        {
        }

        public override void Map()
        {
            base.Map();

            base.Builder.HasOne("Categories").WithMany().HasForeignKey("ParentId").IsRequired(false);
            base.Builder.Property(p => p.Name).IsRequired().HasMaxLength(50);
        }
    }
}
