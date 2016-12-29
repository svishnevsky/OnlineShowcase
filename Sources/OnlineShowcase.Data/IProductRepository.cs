namespace OnlineShowcase.Data
{
    public interface IProductRepository : ISafeProductRepository, IUnsafeProductRepository
    {
    }
}
