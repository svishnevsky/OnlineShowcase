using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Newtonsoft.Json.Linq;

using OnlineShowcase.Core.Notifications;

namespace OnlineShowcase.Core.Services.Notifications
{
    public class NotificationService : INotificationService
    {
        private readonly Dictionary<string, INotificationProcessor> notificationProcessors;

        public NotificationService(IEnumerable<INotificationProcessor> notificationProcessors)
        {
            this.notificationProcessors = notificationProcessors.ToDictionary(np => np.Type, np=> np);
        }

        public Task Add(string type, JObject payload)
        {
            if (!this.notificationProcessors.ContainsKey(type))
            {
                return Task.CompletedTask;
            }

            return this.notificationProcessors[type].Proccess(payload);
        }
    }
}
