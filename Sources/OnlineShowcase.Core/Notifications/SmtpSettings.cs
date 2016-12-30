namespace OnlineShowcase.Core.Notifications
{
    public class SmtpSettings
    {
        public string Host { get; set; }

        public int Port { get; set; }

        public string From { get; set; }

        public string FromEmail { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }
    }
}
