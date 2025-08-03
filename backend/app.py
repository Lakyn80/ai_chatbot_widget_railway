# 📁 backend/app.py

import sys
import os

# ✅ Přidáme backend do cesty, aby fungovaly importy i při přímém spuštění
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from flask import Flask, render_template         # 🟢 Flask a HTML šablony
from flask_cors import CORS                     # 🟢 CORS pro povolení přístupů z různých domén
from routes.chat import chat_bp                 # 🟢 Importujeme náš Blueprint pro /api/chat
from dotenv import load_dotenv                  # 🟢 Načtení proměnných z .env

# ✅ Načteme .env soubor s API klíčem (např. DEEPSEEK_API_KEY)
load_dotenv()

def create_app():
    # ✅ Vytvoření instance Flasku
    app = Flask(__name__)

    # ✅ Povolení CORS pro všechny zdroje (např. React frontend nebo jiné weby)
    CORS(app, resources={r"/*": {"origins": "*"}})

    # ✅ Registrace chatu na prefixu /api
    app.register_blueprint(chat_bp, url_prefix="/api")

    # ✅ Hlavní root endpoint – kontrola, že server běží
    @app.route("/")
    def index():
        return "✅ AI Chatbot backend běží."

    # ✅ Endpoint pro demo stránku – HTML šablona v templates/demo.html
    @app.route("/demo")
    def demo():
        return render_template("demo.html")

    return app

# ✅ Spuštění vývojového serveru na portu 8080
if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=8080, debug=True)
