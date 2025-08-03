# 📁 backend/services/deepseek_api.py

import requests
import os

# 🔑 Načtení API klíče z .env proměnných
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")

# 🟢 Funkce pro komunikaci s DeepSeek API
def get_chatbot_response(prompt):
    # ✅ Správná API URL včetně /v1/
    url = "https://api.deepseek.com/v1/chat/completions"

    # ✅ Hlavičky požadavku včetně API klíče
    headers = {
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
        "Content-Type": "application/json"
    }

    # ✅ Předpřipravený systémový prompt pro e-shop s náramky
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
                "content": prompt
            }
        ]
    }

    try:
        # 🔁 Odeslání požadavku na DeepSeek API
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()  # ➕ Vyhodí chybu pokud není 200 OK

        # ✅ Zpracování odpovědi
        data = response.json()
        return data["choices"][0]["message"]["content"]

    except Exception as e:
        # ❌ Pokud dojde k chybě, vrátí chybovou zprávu
        return f"❌ Chyba při komunikaci s DeepSeek API: {str(e)}"
