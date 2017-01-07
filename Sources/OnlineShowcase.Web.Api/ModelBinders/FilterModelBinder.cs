using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Routing;

using OnlineShowcase.Web.Api.Model;

namespace OnlineShowcase.Web.Api.ModelBinders
{
    public class FilterModelBinder : IModelBinder
    {
        private static readonly string[] ReservedKeys = {"skip", "take", "sort"};

        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            if (bindingContext == null)
            {
                throw new ArgumentNullException(nameof(bindingContext));
            }

            return Task.Factory.StartNew(() =>
            {
                var query = bindingContext.HttpContext.Request.Query;

                var filter = new Filter
                {
                    Skip = this.GetIntParameter(bindingContext, "skip"),
                    Take = this.GetIntParameter(bindingContext, "take"),
                    PropertyFilters = new Dictionary<string, string>()
                };

                if (query.ContainsKey("sort"))
                {
                    var sort = query["sort"].ToString().Split(new[] {':'}, StringSplitOptions.RemoveEmptyEntries);
                    if (sort.Length == 0 || sort.Length > 2 ||
                        (sort.Length == 2 && (sort[1] != "asc" && sort[1] != "desc")))
                    {
                        bindingContext.ActionContext.ModelState.AddModelError("sort", $"\"sort\" format is \"<property name>:<direction(asc or desc):optionsl>\".");
                    }
                    else
                    {
                        filter.SortBy = sort[0];
                        filter.SortAsc = sort.Length == 1 || sort[1] == "asc";
                    }
                }

                if (bindingContext.ActionContext.ModelState.Count > 0)
                {
                    bindingContext.Result = ModelBindingResult.Failed();
                    return;
                }

                foreach (var key in query.Keys.Where(k => !ReservedKeys.Contains(k)))
                {
                    filter.PropertyFilters.Add(key, query[key].ToString());
                }

                foreach (var routeParam in bindingContext.HttpContext.GetRouteData().Values)
                {
                    filter.PropertyFilters.Add(routeParam.Key, routeParam.Value.ToString());
                }

                bindingContext.Result = ModelBindingResult.Success(filter);
            });
        }

        private int? GetIntParameter(ModelBindingContext bindingContext, string key)
        {
            if (!bindingContext.HttpContext.Request.Query.ContainsKey(key))
            {
                return null;
            }

            int value;
            if (int.TryParse(bindingContext.HttpContext.Request.Query[key].ToString(), out value))
            {
                return value;
            }

            bindingContext.ActionContext.ModelState.AddModelError(key, $"\"{key}\" should be numeric.");
            return null;
        }
    }
}
