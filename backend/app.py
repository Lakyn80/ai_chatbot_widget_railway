# 📁 backend/app.py

from flask import Flask, render_template
from flask_cors import CORS

from routes.chat import chat_bp  # ✅ Import Blueprintu

def create_app():
    app = Flask(__name__)

    # ✅ Povolení CORS pro API a statické soubory
    CORS(app, resources={r"/*": {"origins": "*"}})

    # ✅ Registrace /api routy
    app.register_blueprint(chat_bp, url_prefix="/api")

    # ✅ Testovací root endpoint
    @app.route("/")
    def index():
        return "✅ AI Chatbot backend běží."

    # ✅ Route pro demo stránku s widgetem (musí být v `templates/demo.html`)
    @app.route("/demo")
    def demo():
        return render_template("demo.html")

    return app

# ✅ Spuštění aplikace
if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=8080, debug=True)
