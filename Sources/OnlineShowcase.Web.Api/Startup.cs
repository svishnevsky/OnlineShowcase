using System;
using System.Linq;
using System.Reflection;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using OnlineShowcase.Core.Services;
using OnlineShowcase.Data.EF;

namespace OnlineShowcase.Web.Api
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

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

            var connectionString = Configuration.GetConnectionString("DefaultConnection");

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

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseMvc();
        }
    }
}
