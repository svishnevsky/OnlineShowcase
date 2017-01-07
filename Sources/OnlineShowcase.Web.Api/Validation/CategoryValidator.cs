using FluentValidation;
using OnlineShowcase.Web.Api.Model;

namespace OnlineShowcase.Web.Api.Validation
{
    public class CategoryValidator : AbstractValidator<Category>
    {
        public CategoryValidator()
        {
            RuleFor(c => c.Name).NotEmpty();
        }
    }
}
