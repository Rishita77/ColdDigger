FROM python:3.11-slim

# Set working directory
WORKDIR /app/backend

# Copy requirements first for better caching
COPY backend/requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy backend code - copy from backend directory to current directory
COPY backend/ .

# Verify manage.py exists
RUN ls -la manage.py

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose port
EXPOSE $PORT

# Command to run on container start
CMD python manage.py migrate && gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT