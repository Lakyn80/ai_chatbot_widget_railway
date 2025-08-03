# 📁 backend/routes/chat.py

import os
import requests
from flask import Blueprint, request, jsonify
from services.deepseek_api import get_chatbot_response  # ✅ OPRAVENO: relativní import

chat_bp = Blueprint("chat_bp", __name__)

# 🟦 Chat API endpoint
@chat_bp.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")
    response = get_chatbot_response(message)
    return jsonify({"reply": response})
