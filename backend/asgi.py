import os
from app import app  # Import the Flask app
from asgiref.wsgi import WsgiToAsgi

# Wrap the Flask app with WsgiToAsgi to make it ASGI-compatible
asgi_app = WsgiToAsgi(app)

# If you prefer to name it 'app' for Uvicorn, you can assign it accordingly
app = asgi_app
