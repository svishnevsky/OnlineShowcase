using Newtonsoft.Json.Linq;

namespace OnlineShowcase.Web.Api.Model
{
    public class Notification
    {
        public string Type { get; set; }

        public JObject Payload { get; set; }
    }
}
