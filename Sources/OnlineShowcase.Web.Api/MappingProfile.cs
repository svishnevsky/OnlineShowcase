using AutoMapper;
using OnlineShowcase.Core.Model;

namespace OnlineShowcase.Web.Api
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Category, Data.Model.Category>();
            CreateMap<Data.Model.Category, Category>();
        }
    }
}
