namespace OnlineShowcase.Data
{
    public interface IRepository<T> : ISafeRepository<T>, IUnsafeRepository<T>
    {
    }
}
