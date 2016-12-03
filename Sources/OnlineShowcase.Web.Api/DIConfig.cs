using System;
using System.Linq;
using System.Reflection;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OnlineShowcase.Core.Services;
using OnlineShowcase.Data.EF;

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

            services.AddDbContext<DataContext>(options => options.UseSqlServer(connectionString));

            builder.Register(ctx => new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            }));

            builder.Register(ctx => ctx.Resolve<MapperConfiguration>().CreateMapper()).As<IMapper>();

            builder.Populate(services);
            var container = builder.Build();

            return new AutofacServiceProvider(container);
        }
    }
}
