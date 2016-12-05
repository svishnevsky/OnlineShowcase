using System;

namespace OnlineShowcase.Data.Model
{
    public abstract class BaseModel
    {
        public int Id { get; set; }

        public DateTime Created { get; set; }
    }
}
