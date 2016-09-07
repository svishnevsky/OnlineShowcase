using AutoMapper;
using OnlineShowcase.Core.Model;
using OnlineShowcase.Data;

namespace OnlineShowcase.Core.Services
{
    public class ProductManager : DataManager<Product, Data.Model.Product>, IProductManager
    {
        public ProductManager(IProductRepository repository, IMapper mapper) : base(repository, repository, mapper)
        {
        }
    }
}
