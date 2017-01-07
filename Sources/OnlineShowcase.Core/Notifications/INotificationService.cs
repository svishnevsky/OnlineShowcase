using System.Threading.Tasks;

using Newtonsoft.Json.Linq;

namespace OnlineShowcase.Core.Notifications
{
    public interface INotificationService
    {
        Task Add(string type, JObject payload);
    }
}
