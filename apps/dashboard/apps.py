import oscar.apps.dashboard.apps as apps
from django.urls import re_path
from oscar.core.loading import get_class

class DashboardConfig(apps.DashboardConfig):
    name = 'apps.dashboard'

    permissions_map = apps.DashboardConfig.permissions_map.copy()

    permissions_map.update({
        "product-enquiries": (["is_staff"], ["partner.dashboard_access"]),
        "testimonial-list": (["is_staff"], ["partner.dashboard_access"]),
        "testimonial-create": (["is_staff"], ["partner.dashboard_access"]),
        "testimonial-update": (["is_staff"], ["partner.dashboard_access"]),
        "testimonial-delete": (["is_staff"], ["partner.dashboard_access"]),
        "clients-list": (["is_staff"], ["partner.dashboard_access"]),
        "clients-create": (["is_staff"], ["partner.dashboard_access"]),
        "clients-update": (["is_staff"], ["partner.dashboard_access"]),
        "clients-delete": (["is_staff"], ["partner.dashboard_access"]),
    })

    def ready(self):
        super().ready()
        self.product_enquiries = get_class("dashboard.views", "ProductEnquiriesView")
        self.testimonial_list = get_class("dashboard.views", "TestimonialListView")
        self.testimonial_create = get_class("dashboard.views", "TestimonialCreateView")
        self.testimonial_update = get_class("dashboard.views", "TestimonialUpdateView")
        self.testimonial_delete = get_class("dashboard.views", "TestimonialDeleteView")

        self.clients_list = get_class("dashboard.views", "ClientListView")
        self.clients_create = get_class("dashboard.views", "ClientCreateView")
        self.clients_update = get_class("dashboard.views", "ClientUpdateView")
        self.clients_delete = get_class("dashboard.views", "ClientDeleteView")

    def get_urls(self):
        urls = super().get_urls()
        urls += [
            re_path(r"^product-enquiries/$", self.product_enquiries.as_view(), name="product-enquiries"),
            re_path(r"^testimonials/$", self.testimonial_list.as_view(), name="testimonial-list"),
            re_path(r"^testimonials/add/$", self.testimonial_create.as_view(), name="testimonial-create"),
            re_path(r"^testimonials/edit/(?P<pk>\d+)/$", self.testimonial_update.as_view(), name="testimonial-update"),
            re_path(r"^testimonials/delete/(?P<pk>\d+)/$", self.testimonial_delete.as_view(), name="testimonial-delete"),
            
            re_path(r"^clients/$", self.clients_list.as_view(), name="clients-list"),
            re_path(r"^client/add/$", self.clients_create.as_view(), name="client-create"),
            re_path(r"^client/edit/(?P<pk>\d+)/$", self.clients_update.as_view(), name="client-update"),
            re_path(r"^client/delete/(?P<pk>\d+)/$", self.clients_delete.as_view(), name="client-delete"),
        ]
        return self.post_process_urls(urls)
