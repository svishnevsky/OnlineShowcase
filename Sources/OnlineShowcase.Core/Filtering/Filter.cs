namespace OnlineShowcase.Core.Filtering
{
    public class Filter
    {
        public int? Skip { get; set; }

        public int? Take { get; set; }

        public string SortBy { get; set; }

        public bool SortAsc { get; set; }
    }
}
