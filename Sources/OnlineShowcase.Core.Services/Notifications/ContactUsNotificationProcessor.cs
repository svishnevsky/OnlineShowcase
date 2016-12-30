using System.Threading.Tasks;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;

using OnlineShowcase.Core.Notifications;

using MailKit.Net.Smtp;

using MimeKit;

namespace OnlineShowcase.Core.Services.Notifications
{
    public class ContactUsNotificationProcessor : INotificationProcessor
    {
        private static readonly JsonSerializer JsonSerializer = JsonSerializer.CreateDefault(
            new JsonSerializerSettings()
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });

        private readonly SmtpSettings smtpSettings;

        public ContactUsNotificationProcessor(SmtpSettings smtpSettings)
        {
            this.smtpSettings = smtpSettings;
        }

        public string Type => "contact-us";

        public async Task Proccess(JObject payload)
        {
            var notification = payload.ToObject<ContactUsNotification>(JsonSerializer);

            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress(this.smtpSettings.From, this.smtpSettings.FromEmail));
            emailMessage.To.Add(new MailboxAddress(notification.Name, notification.Email));
            emailMessage.Subject = "OnloneShowcase Contact US";
            emailMessage.Body = new TextPart("plain") { Text = $"Dear {notification.Name},\n Thanks for your message." };

            await this.SendEmail(emailMessage);
        }

        private async Task SendEmail(MimeMessage emailMessage)
        {
            using (var client = new SmtpClient())
            {
                client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                await client.ConnectAsync(this.smtpSettings.Host, this.smtpSettings.Port, false);

                client.AuthenticationMechanisms.Remove("XOAUTH2");

                await client.AuthenticateAsync(this.smtpSettings.UserName, this.smtpSettings.Password);

                await client.SendAsync(emailMessage);

                client.Disconnect(true);
            }
        }
    }
}
