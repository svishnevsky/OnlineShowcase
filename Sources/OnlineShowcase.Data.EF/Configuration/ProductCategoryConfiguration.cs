using Microsoft.EntityFrameworkCore;

namespace OnlineShowcase.Data.EF.Configuration
{
    public class ProductCategoryConfiguration : BaseConfiguration<ProductCategory>
    {
        public ProductCategoryConfiguration(ModelBuilder modelBuilder) : base(modelBuilder)
        {
        }

        public override void Map()
        {
            base.Map();

            base.Builder.HasKey("ProductId", "CategoryId");

            base.Builder.HasOne(pc => pc.Product).WithMany().HasForeignKey("ProductId").IsRequired();

            base.Builder.HasOne(pc => pc.Category).WithMany().HasForeignKey("CategoryId").IsRequired();
        }
    }
}
