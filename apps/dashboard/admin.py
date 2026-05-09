from apps.dashboard.models import Enquiries, Testimonial, Client


from . import models
from django.contrib import admin
from oscar.apps.order.admin import *


admin.site.register(Enquiries)
admin.site.register(Client)

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('username', 'rating', 'location', 'image')
    search_fields = ('username', 'location', 'review')
    list_filter = ('rating',)
