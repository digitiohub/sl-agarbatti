from django.shortcuts import render
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Client, Testimonial
from .forms import ClientForm, TestimonialForm


from apps.dashboard.models import Enquiries

class ProductEnquiriesView(ListView):
    model = Enquiries
    template_name = 'oscar/dashboard/product_enquiries.html'
    context_object_name = 'enquiries'
    paginate_by = 10 


class TestimonialListView(ListView):
    model = Testimonial
    template_name = 'oscar/dashboard/testimonial_list.html'
    context_object_name = 'testimonials'

class TestimonialCreateView(CreateView):
    model = Testimonial
    form_class = TestimonialForm
    template_name = 'oscar/dashboard/testimonial_form.html'
    success_url = reverse_lazy('dashboard:testimonial-list')

class TestimonialUpdateView(UpdateView):
    model = Testimonial
    form_class = TestimonialForm
    template_name = 'oscar/dashboard/testimonial_form.html'
    success_url = reverse_lazy('dashboard:testimonial-list')

class TestimonialDeleteView(DeleteView):
    model = Testimonial
    template_name = 'oscar/dashboard/testimonial_confirm_delete.html'
    success_url = reverse_lazy('dashboard:testimonial-list')


class ClientListView(ListView):
    model = Client
    template_name = 'oscar/dashboard/client_list.html'
    context_object_name = 'clients'

class ClientCreateView(CreateView):
    model = Client
    form_class = ClientForm
    template_name = 'oscar/dashboard/client_form.html'
    success_url = reverse_lazy('dashboard:clients-list')

class ClientUpdateView(UpdateView):
    model = Client
    form_class = ClientForm
    template_name = 'oscar/dashboard/client_form.html'
    success_url = reverse_lazy('dashboard:clients-list')

class ClientDeleteView(DeleteView):
    model = Client
    template_name = 'oscar/dashboard/client_confirm_delete.html'
    success_url = reverse_lazy('dashboard:clients-list')