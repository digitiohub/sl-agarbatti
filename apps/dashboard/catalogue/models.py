from django.db import models
from oscar.apps.catalogue.abstract_models import AbstractProduct



class Product(AbstractProduct):
    additional_info = models.TextField(blank=True, null=True)



from oscar.apps.catalogue.models import *
Product = Product