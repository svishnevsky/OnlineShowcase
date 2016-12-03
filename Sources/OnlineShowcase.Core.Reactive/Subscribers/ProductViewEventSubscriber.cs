using OnlineShowcase.Core.Reactive.Events;
using System;

namespace OnlineShowcase.Core.Reactive.Subscribers
{
    public class ProductViewEventSubscriber : IObserver<ProductViewEvent>
    {
        private readonly IUnsafeProductManager productManager;

        public ProductViewEventSubscriber(IUnsafeProductManager productManager)
        {
            this.productManager = productManager;
        }

        public void OnCompleted()
        {
            throw new NotImplementedException();
        }

        public void OnError(Exception error)
        {
            throw new NotImplementedException();
        }

        public void OnNext(ProductViewEvent value)
        {
            this.productManager.IncrementViewsCount(value.ProductId, 1);
        }
    }
}
