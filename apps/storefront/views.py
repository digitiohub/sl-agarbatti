from django.shortcuts import render
from django.shortcuts import render, get_object_or_404
from django.conf import settings

from django.http import Http404, JsonResponse
from django.core.mail import send_mail
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.views.decorators.csrf import csrf_exempt
import re
from django.db import transaction, DatabaseError
from oscar.core.loading import get_model
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from oscar.apps.catalogue.models import Category
from apps.dashboard.catalogue.models import Product
from apps.dashboard.models import Client, Enquiries, Testimonial


def home(request):
    page_name = "Home"
    not_found_img = settings.NOT_FOUND_IMG
    testimonials = Testimonial.objects.all()
    clients = Client.objects.all()
    
    products = Product.objects.all().order_by('id')[:4]

    product_data = []
    for product in products:
        categories = product.categories.all()
        category_slugs = [category.slug for category in categories]

        product_image = product.images.first().original.url if product.images.exists() else not_found_img

        product_data.append({
            'product': product,
            'category_slugs': category_slugs,
            'image': product_image,
        })
    
    return render(request, 'sl/home.html', locals())

def about(request):
    page_name = "About"
    not_found_img = settings.NOT_FOUND_IMG

    return render(request, 'sl/about.html', locals())

def service(request):
    page_name = "Service"
    not_found_img = settings.NOT_FOUND_IMG

    return render(request, 'sl/service.html', locals())


def gallery(request):
    page_name = "Gallery"
    not_found_img = settings.NOT_FOUND_IMG

    return render(request, 'sl/gallery.html', locals())

def supply_chain(request):
    page_name = "Supply chain"
    not_found_img = settings.NOT_FOUND_IMG

    return render(request, 'sl/supply-chain.html', locals())

def faq(request):
    page_name = "FAQ"
    not_found_img = settings.NOT_FOUND_IMG

    return render(request, 'sl/faq.html', locals())

def terms_privacy(request):
    page_name = "Terms-and-privacy"
    not_found_img = settings.NOT_FOUND_IMG

    return render(request, 'sl/terms-and-privacy.html', locals())

def is_valid_phone_number(phone):
    phone_pattern = re.compile(r'^[6789]\d{9}$')
    return bool(re.match(phone_pattern, phone))

def contact_us(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        city = request.POST.get('city')
        country = request.POST.get('country')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        errors = []
        if not first_name or not last_name or not email or not phone or not city or not country or not subject or not message:
            errors.append('All fields are mandatory')

        if email:
            try:
                validate_email(email)
            except ValidationError as e:
                errors.append(str(e))

        if phone and not is_valid_phone_number(phone):
            errors.append('Invalid phone number. Please provide a valid phone number')

        if errors:
            return JsonResponse({'status': 'error', 'message': ' '.join(errors)})

        try:
            with transaction.atomic():
                enquiry = Enquiries.objects.create(
                    first_name=first_name, last_name=last_name, email=email,
                    city=city, country=country, message=message, phone=phone, subject=subject
                )

                email_message = f'''
                <html>
                <head>
                    <style>
                        .container {{
                            border: 1px solid #ddd;
                            border-radius: 8px;
                            padding: 20px;
                            margin-bottom: 20px;
                            background-color: #ffffff;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            font-family: Arial, sans-serif;
                        }}
                        .header {{
                            text-align: center;
                            margin-bottom: 20px;
                        }}
                        .header h2 {{
                            color: #333;
                        }}
                        .content p {{
                            font-size: 14px;
                            color: #555;
                        }}
                        .content p strong {{
                            color: #333;
                        }}
                        .footer {{
                            text-align: center;
                            margin-top: 20px;
                            font-size: 12px;
                            color: #aaa;
                        }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>Enquiry</h2>
                        </div>
                        <div class="content">
                            <p><strong>Name:</strong> {first_name} {last_name}</p>
                            <p><strong>Email:</strong> {email}</p>
                            <p><strong>Phone:</strong> {phone}</p>
                            <p><strong>Subject:</strong> {subject}</p>
                            <p><strong>Message:</strong> {message}</p>
                        </div>
                    </div>
                </body>
                </html>
                '''

                # Send the email
                send_mail(
                    'Customer Enquiry',
                    '',
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.CONTACT_EMAIL],
                    html_message=email_message
                )

                return JsonResponse({'status': 'success', 'message': 'Thank you for contacting us. We will get back to you soon.'})

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': 'Something went wrong, please try again later.'})

    return render(request, 'sl/contact-us.html',locals())


def products(request, main_category_slug=None, sub_category_slug=None, third_category_slug=None, fourth_category_slug=None):
    page_name = "Products"
    not_found_img = settings.NOT_FOUND_IMG

    main_category = sub_category = third_category = fourth_category = None
    tab_categories = []
    third_level_categories = []

    # Fetch categories based on slugs
    if main_category_slug:
        main_category = get_object_or_404(Category, slug=main_category_slug)
    if sub_category_slug:
        sub_category = get_object_or_404(Category, slug=sub_category_slug)
        # Fetch third-level categories if a subcategory is provided
        third_level_categories = sub_category.get_children()
    if third_category_slug:
        third_category = get_object_or_404(Category, slug=third_category_slug)
    if fourth_category_slug:
        fourth_category = get_object_or_404(Category, slug=fourth_category_slug)

    # Determine which products to display
    if fourth_category:
        categories = [fourth_category] + list(fourth_category.get_descendants())
    elif third_category:
        categories = [third_category] + list(third_category.get_descendants())
    elif sub_category:
        categories = [sub_category] + list(sub_category.get_descendants())
    elif main_category:
        categories = [main_category] + list(main_category.get_descendants())
    else:
        raise Http404("Category not found")

    products = Product.objects.filter(categories__in=categories).distinct().order_by('id')

    # Handle pagination
    paginator = Paginator(products, 9)
    page = request.GET.get('page')
    try:
        product_info = paginator.page(page)
    except PageNotAnInteger:
        product_info = paginator.page(1)
    except EmptyPage:
        product_info = paginator.page(paginator.num_pages)

    # Fetch child categories for tab navigation
    if main_category_slug:
        parent_category = main_category.get_ancestors().last() if main_category.get_ancestors() else None
        tab_categories = main_category.get_children()
    else:
        parent_category = None
        tab_categories = Category.objects.none()

    category_products = []
    for category in categories:
        products = Product.objects.filter(
            categories__in=[category] + list(category.get_descendants())
        ).distinct()
        category_products.append({
            'category': category,
            'products': products
        })

    return render(request, 'sl/products.html', locals())
    
def products_details(request, product):
    page_name = "Product Details"
    not_found_img = settings.NOT_FOUND_IMG
    product = Product.objects.filter(slug=product).first()

    main_cat = product.categories.first().get_root()

    related_products = Product.objects.filter(
        categories__in=main_cat.get_descendants()).exclude(pk=product.pk)[:8]

    return render(request, 'sl/product-detail.html', locals())
    

def careers(request):
    page_name = "careers"
    not_found_img = settings.NOT_FOUND_IMG
    return render(request, 'sl/careers.html', locals())

def clients(request):
    page_name = "Prestigious clients"
    not_found_img = settings.NOT_FOUND_IMG
    clients = Client.objects.all()

    return render(request, 'sl/prestigious-client.html', locals())