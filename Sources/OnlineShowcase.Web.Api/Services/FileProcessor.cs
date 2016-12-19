using System;
using System.IO;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using FileInfo = OnlineShowcase.Web.Api.Model.FileInfo;

namespace OnlineShowcase.Web.Api.Services
{
    public class FileProcessor : IFileProcessor
    {
        private readonly string uploadFolder;

        public FileProcessor(string uploadFolder)
        {
            this.uploadFolder = uploadFolder;
        }

        public async Task<FileInfo> Process(IFormFile file)
        {
            string hash;

            using (var md5 = MD5.Create())
            {
                hash = BitConverter.ToString(md5.ComputeHash(file.OpenReadStream())).Replace("-", "");
            }

            var filePath = Path.Combine(this.uploadFolder, hash);

            if (!File.Exists(filePath))
            {
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
            }

            return new FileInfo
            {
                Name = hash,
                Path = this.uploadFolder
            };
        }
    }
}
