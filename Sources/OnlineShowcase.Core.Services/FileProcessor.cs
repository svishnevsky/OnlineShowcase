using System;
using System.IO;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace OnlineShowcase.Core.Services
{
    public class FileProcessor : IFileProcessor
    {
        private readonly string uploadFolder;

        public FileProcessor(string uploadFolder)
        {
            this.uploadFolder = uploadFolder;
        }

        public async Task<Model.FileInfo> Process(Stream stream)
        {
            string hash;

            using (var md5 = MD5.Create())
            {

                hash = BitConverter.ToString(md5.ComputeHash(stream)).Replace("-", "");
            }

            var filePath = Path.Combine(this.uploadFolder, hash);

            if (!File.Exists(filePath))
            {
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    stream.Position = 0;
                    await stream.CopyToAsync(fileStream);
                }
            }

            return new Model.FileInfo
            {
                Name = hash,
                Path = this.uploadFolder
            };
        }
    }
}
