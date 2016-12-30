using Microsoft.AspNetCore.Mvc;
using OnlineShowcase.Core.Notifications;
using OnlineShowcase.Web.Api.Model;
using OnlineShowcase.Web.Api.Validation;

namespace OnlineShowcase.Web.Api.Controllers
{
    public class NotificationsController : Controller
    {
        private readonly INotificationService notificationService;

        public NotificationsController(INotificationService notificationService)
        {
            this.notificationService = notificationService;
        }

        [HttpPost]
        [ModelValidation]
        [ActionName("Index")]
        public virtual ActionResult Post([FromBody]Notification model)
        {
            this.notificationService.Add(model.Type, model.Payload);
            return this.Accepted();
        }
    }
}
