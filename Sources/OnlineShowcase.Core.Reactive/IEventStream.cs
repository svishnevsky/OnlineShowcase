using System;

namespace OnlineShowcase.Core.Reactive
{
    public interface IEventStream
    {
        void Push<TEvent>(TEvent @event);

        void Subscribe<TEvent>(IObserver<TEvent> observer);

        void Unsubscribe<TEvent>(IObserver<TEvent> observer);
    }
}
