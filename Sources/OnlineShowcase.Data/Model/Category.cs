namespace OnlineShowcase.Data.Model
{
    public class Category : BaseModel
    {
        public int? ParentId { get; set; }

        public string Name { get; set; }
    }
}
