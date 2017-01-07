using System.Threading.Tasks;

using Newtonsoft.Json.Linq;

namespace OnlineShowcase.Core.Notifications
{
    public interface INotificationProcessor
    {
        string Type { get; }

        Task Proccess(JObject payload);
    }
}
