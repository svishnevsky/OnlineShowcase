using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace OnlineShowcase.Core.Reactive
{
    public class EventStream : IEventStream
    {
        private object lockObj = new object();

        private ConcurrentDictionary<Type, List<WeakReference>> subscribers = new ConcurrentDictionary<Type, List<WeakReference>>();
        
        public void Push<TEvent>(TEvent @event)
        {
            var eventType = @event.GetType();

            var compatible = this.subscribers.ContainsKey(eventType) ? this.subscribers[eventType] : Enumerable.Empty<WeakReference>();

            foreach (var reference in compatible)
            {
                if (!reference.IsAlive)
                {
                    this.subscribers[eventType].Remove(reference);
                    continue;
                }

                ((IObserver<TEvent>)reference.Target).OnNext(@event);
            }
        }

        public void Subscribe<TEvent>(IObserver<TEvent> observer)
        {
            lock (this.lockObj)
            {
                if (this.subscribers.ContainsKey(typeof(TEvent)))
                {
                    var exists = this.subscribers[typeof(TEvent)].FirstOrDefault(r => r.Target == observer);
                    if (exists == null)
                    {
                        this.subscribers[typeof(TEvent)].Add(new WeakReference(observer));
                    }

                    return;
                }

                this.subscribers.TryAdd(typeof(TEvent), new List<WeakReference> { new WeakReference(observer) });
            }
        }

        public void Unsubscribe<TEvent>(IObserver<TEvent> observer)
        {
            lock (this.lockObj)
            {
                if (!this.subscribers.ContainsKey(typeof(TEvent)))
                {
                    return;
                }

                var reference = this.subscribers[typeof(TEvent)].FirstOrDefault(r => r.Target == observer);

                if (reference != null)
                {
                    this.subscribers[typeof(TEvent)].Remove(reference);
                }
            }
        }
    }
}
