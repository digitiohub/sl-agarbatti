from django import template

register = template.Library()
@register.filter
def belongs_to_category(product, category_name):
    return any(category.name == category_name for category in product.categories.all())