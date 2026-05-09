FROM python:3.11-slim

# Set non-interactive mode for APT and timezone
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Etc/UTC

WORKDIR /app

# Install system dependencies including GLib and GTK-related libraries
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    libglib2.0-dev \
    libgtk-3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the project files
COPY . /app/

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose the application port
EXPOSE 8006

# Run the application using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8006", "sl.wsgi:application"]
