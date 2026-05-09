from django import forms
from oscar.apps.dashboard.catalogue.forms import ProductSearchForm as searchProductForm
from oscar.apps.dashboard.catalogue.forms import ProductForm as MainProductForm
from oscar.apps.dashboard.catalogue.forms import SEOFormMixin as MainSEOFormMixin
from oscar.core.loading import get_model

ProductClass = get_model("catalogue", "ProductClass")
Product = get_model("catalogue", "Product")

class CustomSEOFormMixin(MainSEOFormMixin):
    seo_fields = ["meta_title", "meta_description", "slug"]
    additional_info = ["additional_info"]
    primary_excluded_fields = ['slug',
        "meta_title", "meta_description"]

    def primary_form_fields(self):
        return [
            field
            for field in self
            if not field.is_hidden and not self.excluded_fields_for_primary(field)
        ]

    def seo_form_fields(self):
        return [field for field in self if self.is_seo_field(field)]

    def is_seo_field(self, field):
        return field.name in self.seo_fields

    def additional_form_fields(self):
        return [field for field in self if self.is_addtional_info_field(field)]

    def is_addtional_info_field(self, field):
        return field.name in self.additional_info

    def excluded_fields_for_primary(self, field):
        return field.name in self.primary_excluded_fields

class CustomProductForm(CustomSEOFormMixin, MainProductForm):
    class Meta:
        model = Product
        fields = [
            "title",
            "description",
            "additional_info",
            "upc",
            "slug",
            "meta_title",
            "meta_description",
        ]
        exclude = ["is_public", "is_discountable"]