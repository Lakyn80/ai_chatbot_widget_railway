# 📁 backend/routes/chat.py

import os
import requests
from flask import Blueprint, request, jsonify

chat_bp = Blueprint("chat_bp", __name__)

# 🔑 Získání API klíče z .env souboru
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")

# 🟢 Funkce pro komunikaci s DeepSeek API
def get_bot_response(user_input):
    try:
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {DEEPSEEK_API_KEY}"
        }

        payload = {
            "model": "deepseek-chat",
            "messages": [
                {
                    "role": "system",
                    "content": (
                        "Jsi AI asistent pro e-shop s náramky. "
                        "Pomáhej zákazníkům s výběrem náramků, odpovídej mile a česky. "
                        "Neodpovídej na žádné jiné téma než náramky, kategorie, dárek, balení, cena, velikost nebo osobní doporučení."
                    )
                },
                {
                    "role": "user",
                    "content": user_input
                }
            ]
        }

        response = requests.post("https://api.deepseek.com/chat/completions", headers=headers, json=payload)

        if response.status_code == 200:
            data = response.json()
            reply = data["choices"][0]["message"]["content"]
            return reply
        else:
            return f"Chyba při komunikaci s AI: {response.status_code}"
    except Exception as e:
        return f"Nastala chyba: {str(e)}"

# 🟦 Chat API endpoint
@chat_bp.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")
    response = get_bot_response(message)
    return jsonify({"reply": response})
