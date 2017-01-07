using System;
using System.Linq;
using System.Reflection;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OnlineShowcase.Core;
using OnlineShowcase.Core.Notifications;
using OnlineShowcase.Core.Services;
using OnlineShowcase.Data.EF;
using OnlineShowcase.Core.Reactive.Events;
using OnlineShowcase.Core.Reactive.Subscribers;
using OnlineShowcase.Core.Reactive;
using OnlineShowcase.Core.Services.Notifications;

namespace OnlineShowcase.Web.Api
{
    public static class DIConfig
    {
        public static IServiceProvider Build(IServiceCollection services, IConfigurationRoot configuration)
        {
            var builder = new ContainerBuilder();

            var assembly = typeof(DataManager<,>).GetTypeInfo().Assembly;

            builder.RegisterAssemblyTypes(assembly)
                .Where(t => !t.GetTypeInfo().IsAbstract && t.GetInterfaces().Any() && t.Name.EndsWith("Manager"))
                .AsImplementedInterfaces()
                .InstancePerDependency();

            assembly = typeof(Repository<>).GetTypeInfo().Assembly;

            builder.RegisterAssemblyTypes(assembly)
                .Where(t => !t.GetTypeInfo().IsAbstract && t.GetInterfaces().Any() && t.Name.EndsWith("Repository"))
                .AsImplementedInterfaces()
                .InstancePerDependency();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<DataContext>(optionsBuilder => optionsBuilder.UseSqlServer(connectionString));
            
            builder.Register(ctx => new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            }));

            builder.Register(ctx => ctx.Resolve<MapperConfiguration>().CreateMapper()).As<IMapper>();

            builder.RegisterType<ProductViewEventSubscriber>()
                .As<IObserver<ProductViewEvent>>()
                .SingleInstance();
            
            builder.RegisterType<ContactUsNotificationProcessor>()
                .WithParameter("smtpSettings", new SmtpSettings
                                                   {
                                                       Host = configuration["Smtp:Host"],
                                                       Port = int.Parse(configuration["Smtp:Port"]),
                                                       From = configuration["Smtp:From"],
                                                       FromEmail = configuration["Smtp:FromEmail"],
                                                       UserName = configuration["Smtp:UserName"],
                                                       Password = configuration["Smtp:Password"]
                })
                .As<INotificationProcessor>()
                .SingleInstance();

            builder.RegisterType<NotificationService>()
                .As<INotificationService>()
                .SingleInstance();

            builder.RegisterType<EventStream>()
                .As<IEventStream>()
                .OnActivated(e =>
                {
                    e.Instance.Subscribe(e.Context.Resolve<IObserver<ProductViewEvent>>());
                })
                .SingleInstance();

            builder.RegisterType<FileProcessor>()
                .WithParameter("uploadFolder", configuration["AppSettings:UploadFolder"])
                .As<IFileProcessor>()
                .SingleInstance();

            builder.Populate(services);
            var container = builder.Build();

            return new AutofacServiceProvider(container);
        }
    }
}
