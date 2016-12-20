using Humanizer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using OnlineShowcase.Web.Api.Controllers.Common;
using System.Linq;
using System.Reflection;

namespace OnlineShowcase.Web.Api
{
    public static class RoutingConfig
    {
        public static void Register(IRouteBuilder builder)
        {
            var entitiesControllerTypes = Assembly.GetEntryAssembly().GetTypes()
                .Where(t => !t.GetTypeInfo().IsAbstract
                && t.GetTypeInfo().BaseType.GetTypeInfo().IsGenericType
                && t.GetTypeInfo().BaseType.GetTypeInfo().GetGenericTypeDefinition() == typeof(EntitiesController<,,,>));

            foreach (var type in entitiesControllerTypes)
            {
                var name = type.Name.Replace("Controller", string.Empty);
                builder.MapWebApiRoute(name, name.ToLower(), defaults: new { controller = name, action = "Index" });
            }

            var entityControllerTypes = Assembly.GetEntryAssembly().GetTypes()
                .Where(t => !t.GetTypeInfo().IsAbstract
                && t.GetTypeInfo().BaseType.GetTypeInfo().IsGenericType
                && t.GetTypeInfo().BaseType.GetTypeInfo().GetGenericTypeDefinition() == typeof(EntityController<,>));

            foreach (var type in entityControllerTypes)
            {
                var name = type.Name.Replace("Controller", string.Empty);
                builder.MapWebApiRoute(name, $"{name.ToLower().Pluralize()}/{{id:int}}", defaults: new { controller = name, action = "Index" });
            }

            builder.MapWebApiRoute("FilesByPath", "files/{*path}", defaults: new {controller = "Files", action = "Index"});
        }
    }
}
