using FluentValidation;
using OnlineShowcase.Web.Api.Model;

namespace OnlineShowcase.Web.Api.Validation
{
    public class ProductValidator : AbstractValidator<Product>
    {
        public ProductValidator()
        {
            this.RuleFor(c => c.Name).NotEmpty().Length(1, 150);
            this.RuleFor(c => c.Description).NotEmpty().Length(1, 4000);
        }
    }
}
