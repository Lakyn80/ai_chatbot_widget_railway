# 📁 backend/routes/chat.py

from flask import Blueprint, request, jsonify

chat_bp = Blueprint("chat_bp", __name__)

# 🟢 Jednoduchá funkce pro získání odpovědi (pouze demo – později nahradíme GPT)
def get_bot_response(user_input):
    if "náramek" in user_input.lower():
        return "Doporučuji elegantní náramek s kamínky nebo variantu pro děti."
    elif "děkuji" in user_input.lower():
        return "Rádo se stalo 😊"
    else:
        return "Omlouvám se, nerozumím. Zeptejte se prosím jinak."

# 🟦 Chat API endpoint
@chat_bp.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")
    response = get_bot_response(message)
    return jsonify({"reply": response})
