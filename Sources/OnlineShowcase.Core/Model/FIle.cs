using System;
using System.IO;

namespace OnlineShowcase.Core.Model
{
    public class File : IDisposable
    {
        public int Id { get; set; }

        public string Path { get; set; }

        public string Name { get; set; }

        public string Reference { get; set; }

        public string MediaType { get; set; }

        public Stream FileStream { get; set; }

        public void Dispose()
        {
            this.FileStream?.Dispose();
        }
    }
}
