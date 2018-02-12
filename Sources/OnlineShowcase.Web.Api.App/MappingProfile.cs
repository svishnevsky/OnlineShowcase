using System;
using System.IO;
using System.Linq;

using AutoMapper;
using OnlineShowcase.Data.Filtering;
using OnlineShowcase.Web.Api.Model;

namespace OnlineShowcase.Web.Api.App
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Core.Model.Category, Data.Model.Category>();
            CreateMap<Data.Model.Category, Core.Model.Category>();

            CreateMap<Category, Core.Model.Category>();
            CreateMap<Core.Model.Category, Category>();

            CreateMap<Core.Model.Product, Data.Model.Product>();
            CreateMap<Data.Model.Product, Core.Model.Product>();

            CreateMap<Product, Core.Model.Product>();
            CreateMap<Core.Model.Product, Product>();

            CreateMap<Core.Model.FileInfo, Core.Model.File>()
                .ForMember(d => d.Reference, s => s.MapFrom(fi => Path.Combine(fi.Path, fi.Name)))
                .ForMember(d => d.Path, s => s.Ignore());

            CreateMap<Core.Model.File, int>()
                .ConstructUsing(f => f.Id);

            CreateMap<Core.Model.File, Data.Model.File>();
            CreateMap<Data.Model.File, Core.Model.File>();

            CreateMap<Core.Filtering.ProductFilter, IFilter<Data.Model.Product>>()
                .ConstructUsing(
                    ctor => new Data.EF.Filtering.ProductFilter
                    {
                        Skip = ctor.Skip,
                        Take = ctor.Take,
                        SortBy = ctor.SortBy,
                        SortAsc = ctor.SortAsc,
                        Categories = ctor.Categories
                    })
                .As<Data.EF.Filtering.ProductFilter>();

            CreateMap<Core.Filtering.Filter, IFilter<Data.Model.Category>>()
                .As<Data.EF.Filtering.CategoryFilter>();
            
            CreateMap<Core.Filtering.FileFilter, IFilter<Data.Model.File>>()
                .ConstructUsing(
                    ctor => new Data.EF.Filtering.FileFilter
                    {
                        Skip = ctor.Skip,
                        Take = ctor.Take,
                        SortBy = ctor.SortBy,
                        SortAsc = ctor.SortAsc,
                        Path = ctor.Path
                    })
                .As<Data.EF.Filtering.FileFilter>();

            CreateMap<Filter, Core.Filtering.Filter>();
            CreateMap<Filter, Core.Filtering.ProductFilter>()
                .ForMember(
                    d => d.Categories,
                    s => s.MapFrom(
                        f => !f.PropertyFilters.ContainsKey("categories")
                                 ? null
                                 : f.PropertyFilters["categories"].Trim('[', ']')
                                       .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                                       .Select(int.Parse)));

            CreateMap<Filter, Core.Filtering.FileFilter>()
                .ForMember(d => d.Path, s => s.MapFrom(f => !f.PropertyFilters.ContainsKey("path") ? null : f.PropertyFilters["path"]));
        }
    }
}
