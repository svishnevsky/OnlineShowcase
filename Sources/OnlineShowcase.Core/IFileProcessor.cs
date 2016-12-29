using System.IO;
using System.Threading.Tasks;

using FileInfo = OnlineShowcase.Core.Model.FileInfo;

namespace OnlineShowcase.Core
{
    public interface IFileProcessor
    {
        Task<FileInfo> Process(Stream fileStream);
    }
}
