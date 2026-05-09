from oscar.apps.dashboard.catalogue.views import ProductCreateUpdateView
from apps.dashboard.catalogue.forms import CustomProductForm
from oscar.core.loading import get_class, get_model

Category = get_model("catalogue", "Category")
Partner = get_model("partner", "Partner")
Product = get_model("catalogue", "Product")
ProductCategory = get_model("catalogue", "ProductCategory")
ProductClass = get_model("catalogue", "ProductClass")
StockRecord = get_model("partner", "StockRecord")
ProductAttribute = get_model("catalogue", "ProductAttribute")
ProductImage = get_model('catalogue', 'ProductImage')

class ProductCreateUpdateView(ProductCreateUpdateView):
    model = Product
    form_class = CustomProductForm