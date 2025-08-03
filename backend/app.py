# 📁 backend/app.py

import sys
import os

# ✅ Přidáme backend do cesty pro správné importy
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from flask import Flask, render_template
from flask_cors import CORS
from dotenv import load_dotenv
from routes.chat import chat_bp

# ✅ Načtení proměnných z .env
load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})

    # ✅ Registrace API routy
    app.register_blueprint(chat_bp, url_prefix="/api")

    @app.route("/")
    def index():
        return "✅ AI Chatbot backend běží."

    @app.route("/demo")
    def demo():
        return render_template("demo.html")

    return app
