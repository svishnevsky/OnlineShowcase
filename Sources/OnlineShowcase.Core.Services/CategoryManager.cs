using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;
using OnlineShowcase.Core.Model;
using OnlineShowcase.Data;

namespace OnlineShowcase.Core.Services
{
    public class CategoryManager : DataManager<Category, Data.Model.Category>, ICategoryManager
    {
        public CategoryManager(ICategoryRepository repository, IMapper mapper) : base(repository, repository, mapper)
        {
        }

        public override async Task<IEnumerable<Category>> Get()
        {
            var categories = (await base.Get()).ToArray();

            var leaves = categories.Where(c => c.ParentId.HasValue)
                .GroupBy(c => c.ParentId.Value)
                .ToDictionary(c => c.Key, c => c.AsEnumerable());

            var root = categories.Where(c => !c.ParentId.HasValue).Select(c => this.BuildTree(c, leaves));

            return root;
        }

        private Category BuildTree(Category parent, IReadOnlyDictionary<int, IEnumerable<Category>> leaves)
        {
            if (!leaves.ContainsKey(parent.Id))
            {
                return parent;
            }

            parent.Children = leaves[parent.Id];

            foreach (var category in parent.Children)
            {
                this.BuildTree(category, leaves);
            }

            return parent;
        } 
    }
}
