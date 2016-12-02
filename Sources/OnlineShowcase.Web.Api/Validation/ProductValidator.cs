using FluentValidation;
using OnlineShowcase.Web.Api.Model;

namespace OnlineShowcase.Web.Api.Validation
{
    public class ProductValidator : AbstractValidator<Product>
    {
        public ProductValidator()
        {
            this.RuleFor(c => c.Name).NotEmpty();
        }
    }
}
