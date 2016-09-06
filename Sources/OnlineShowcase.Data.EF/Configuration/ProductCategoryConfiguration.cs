using Microsoft.EntityFrameworkCore;

namespace OnlineShowcase.Data.EF.Configuration
{
    public class ProductCategoryConfiguration : ManyToManyConfiguration<ProductCategory>
    {
        public ProductCategoryConfiguration(ModelBuilder modelBuilder) : base(modelBuilder)
        {
        }

        public override void Map()
        {
            base.Builder.HasKey("ProductId", "CategoryId");

            base.Builder.HasOne("Products").WithMany().HasForeignKey("ProductId").IsRequired();

            base.Builder.HasOne("Categories").WithMany().HasForeignKey("CategoryId").IsRequired();
        }
    }
}
