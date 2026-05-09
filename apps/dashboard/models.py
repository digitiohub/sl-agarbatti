from oscar.apps.dashboard.models import * 


from django.db import models

class Enquiries(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    subject = models.CharField(max_length=100)
    message = models.TextField()

    verbose_name = "Enquiry"
    verbose_name_plural = "Enquiry"

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.subject}"


class Testimonial(models.Model):
    username = models.CharField(max_length=255)
    review = models.TextField()
    rating = models.PositiveIntegerField(default=0) 
    location = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='testimonials/', blank=True, null=True)

    def __str__(self):
        return self.username
    

class Client(models.Model):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='clients/')
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name