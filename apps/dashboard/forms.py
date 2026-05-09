from django import forms
from .models import Testimonial,Client

class TestimonialForm(forms.ModelForm):
    class Meta:
        model = Testimonial
        fields = ['username', 'review', 'rating', 'location', 'image']
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control'}),
            'review': forms.Textarea(attrs={'class': 'form-control', 'rows': 4}),
            'rating': forms.NumberInput(attrs={'class': 'form-control'}),
            'location': forms.TextInput(attrs={'class': 'form-control'}),
            'image': forms.ClearableFileInput(attrs={'class': 'form-control-file'}),
        }

class ClientForm(forms.ModelForm):
    class Meta:
        model = Client
        fields = '__all__'
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'image': forms.ClearableFileInput(attrs={'class': 'form-control-file'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'rows': 4}),
        }