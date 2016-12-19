using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using OnlineShowcase.Data.Model;

namespace OnlineShowcase.Data.EF
{
    public class FileRepository : Repository<File>, IImageRepository
    {
        public FileRepository(DataContext context) : base(context)
        {
        }

        public override async Task<int> Add(File entity)
        {
            var fileId = new SqlParameter("@FileId", SqlDbType.Int) { Direction = ParameterDirection.Output };
            await base.ExecSP<int>("AddFile", null, new SqlParameter("@Path", entity.Path), new SqlParameter("@Name", entity.Name), new SqlParameter("@Reference", entity.Reference), fileId);
            return (int)fileId.Value;
        }
    }
}
