FROM python:3.11-slim

WORKDIR /app

# Copy requirements first for better caching
COPY backend/requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy backend code
COPY backend/ .

# Verify manage.py exists and is executable
RUN ls -la manage.py && python manage.py check

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose port
EXPOSE $PORT

# Command to run on container start
CMD gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT

# FROM python:3.11-slim

# WORKDIR /app

# # Copy requirements first for better caching
# COPY requirements.txt .

# # Install dependencies
# RUN pip install -r requirements.txt

# # Copy backend code
# COPY . .

# # Collect static files
# RUN python manage.py collectstatic --noinput

# # Expose port
# EXPOSE $PORT

# # Command to run on container start
# CMD python manage.py migrate && gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT