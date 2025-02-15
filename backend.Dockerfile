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

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:$PORT/health/ || exit 1

EXPOSE $PORT

# Add startup timeout
CMD timeout 60 bash -c 'until printf "" 2>>/dev/null >>/dev/tcp/$HOST/$PORT; do sleep 1; done' && \
    python manage.py migrate && \
    gunicorn backend.wsgi:application \
    --bind 0.0.0.0:$PORT \
    --workers 2 \
    --threads 2 \
    --timeout 60 \
    --keep-alive 5 \
    --max-requests 1000 \
    --max-requests-jitter 50