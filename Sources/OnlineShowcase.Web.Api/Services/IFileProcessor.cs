using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using OnlineShowcase.Web.Api.Model;

namespace OnlineShowcase.Web.Api.Services
{
    public interface IFileProcessor
    {
        Task<FileInfo> Process(IFormFile file);
    }
}
