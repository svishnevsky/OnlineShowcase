using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data.EF.Configuration
{
    public class ProductCategory
    {
        public int ProductId { get; set; }

        public virtual Product Product { get; set; }

        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }
    }
}
