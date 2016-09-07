using OnlineShowcase.Core.Model;
using OnlineShowcase.Data;

namespace OnlineShowcase.Core.Services
{
    public class ProductManager : DataManager<Product, Data.Model.Product>, IProductManager
    {
        public ProductManager(IProductRepository repository) : base(repository, repository)
        {
        }

        protected override Product Map(Data.Model.Product entity)
        {
            throw new System.NotImplementedException();
        }

        protected override Data.Model.Product Map(Product model)
        {
            throw new System.NotImplementedException();
        }
    }
}
