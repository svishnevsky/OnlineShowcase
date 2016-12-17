using Microsoft.EntityFrameworkCore;
using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data.EF.Configuration
{
    public class ImageConfiguration : EntityConfiguration<Image>
    {
        public ImageConfiguration(ModelBuilder modelBuilder) : base(modelBuilder)
        {
        }

        public override void Map()
        {
            base.Map();

            base.Builder.Property(p => p.Path).IsRequired();
            base.Builder.Property(p => p.Name).IsRequired();
            base.Builder.Property(p => p.Reference).IsRequired();

            base.Builder.HasIndex(p => p.Path);
        }
    }
}
