FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

# Run migrations then start server
CMD sh -c "python manage.py migrate && python manage.py collectstatic --no-input && gunicorn portfolio_project.wsgi:application --bind 0.0.0.0:${PORT:-8000}"