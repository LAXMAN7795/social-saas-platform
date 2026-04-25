import requests

BOT_TOKEN = "8635493162:AAGvlADeNUJosRvbWB7e7VVT_jq0JiWb2As"
CHAT_ID = "5859985895"

def publish_telegram(content):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"

    data = {
        "chat_id": CHAT_ID,
        "text": content
    }

    response = requests.post(url, json=data)

    return response.json()