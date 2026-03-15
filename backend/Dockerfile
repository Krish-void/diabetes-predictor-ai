# Use lightweight python 3.10 slim image
FROM python:3.10-slim

# Set working directory inside container
WORKDIR /app

# Copy requirement list first to leverage docker layer caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all the remaining backend files
COPY . .

# Expose port 5000
EXPOSE 5000

# Start Flask via Gunicorn for production readiness
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
