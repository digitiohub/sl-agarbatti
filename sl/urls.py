"""
URL configuration for sl project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from django.apps import apps

from apps.storefront import views as storefront

urlpatterns = [

    path('', storefront.home, name='home'),
    path('about', storefront.about, name='about'),
    path('products/<slug:main_category_slug>',storefront.products, name='products'),
    path('products/<slug:main_category_slug>/<slug:sub_category_slug>/', storefront.products, name='products_sub_category'),
    path('products/<slug:main_category_slug>/<slug:sub_category_slug>/<slug:third_category_slug>/', storefront.products, name='products_third_category'),
    path('product-detail/<slug:product>',storefront.products_details, name='product-detail'),
    path('service', storefront.service, name='service'),
    path('gallery', storefront.gallery, name='gallery'),
    path('supply-chain', storefront.supply_chain, name='supply-chain'),
    path('faq', storefront.faq, name='faq'),
    path('contact-us', storefront.contact_us, name='contact-us'),
    path('careers', storefront.careers, name='careers'),
    path('prestigious-clients', storefront.clients, name='clients'),
    path('terms-and-privacy', storefront.terms_privacy, name='terms-and-privacy'),

    path('admin/', admin.site.urls), 
    path('', include(apps.get_app_config('oscar').urls[0])),   
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
