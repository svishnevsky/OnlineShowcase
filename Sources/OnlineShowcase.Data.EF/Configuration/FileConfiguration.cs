using Microsoft.EntityFrameworkCore;
using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data.EF.Configuration
{
    public class FileConfiguration : EntityConfiguration<File>
    {
        public FileConfiguration(ModelBuilder modelBuilder) : base(modelBuilder)
        {
        }

        public override void Map()
        {
            base.Map();

            base.Builder.Property(p => p.Path).IsRequired();
            base.Builder.Property(p => p.Name).IsRequired();
            base.Builder.Property(p => p.Reference).IsRequired();

            base.Builder.HasIndex(p => new { p.Path, p.Name }).IsUnique();
        }
    }
}
