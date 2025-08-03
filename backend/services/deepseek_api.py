# 📁 backend/services/deepseek_api.py

import requests
import os

# 🟢 Načteme klíč z proměnných prostředí (doporučeno pro Railway)
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")

# 🔁 Funkce pro volání DeepSeek API
def get_chatbot_response(prompt):
    url = "https://api.deepseek.com/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "deepseek-chat",
        "messages": [
            {"role": "system", "content": "You are a helpful AI assistant for a company."},
            {"role": "user", "content": prompt}
        ]
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["message"]["content"]
    except Exception as e:
        return f"❌ Chyba při komunikaci s DeepSeek API: {str(e)}"
