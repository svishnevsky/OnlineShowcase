using Microsoft.EntityFrameworkCore;
using OnlineShowcase.Data.Model;

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

            base.Builder.HasOne(typeof(Product)).WithMany().HasForeignKey("ProductId").IsRequired();

            base.Builder.HasOne(typeof(Category)).WithMany().HasForeignKey("CategoryId").IsRequired();
        }
    }
}
