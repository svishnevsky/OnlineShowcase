using AutoMapper;
using OnlineShowcase.Web.Api.Model;

namespace OnlineShowcase.Web.Api
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Core.Model.Category, Data.Model.Category>();
            CreateMap<Data.Model.Category, Core.Model.Category>();

            CreateMap<Category, Core.Model.Category>();
            CreateMap<Core.Model.Category, Category>();
        }
    }
}
