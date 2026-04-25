import requests
import os

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

URL = "https://api.groq.com/openai/v1/chat/completions"

def call_ai(prompt):
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "llama-3.1-8b-instant",
        "messages": [{"role": "user", "content": prompt}]
    }

    res = requests.post(URL, headers=headers, json=data)
    response_json = res.json()
    print("AI RESPONSE:", response_json)

    if "choices" not in response_json:
        return "AI Error: " + str(response_json)

    return response_json["choices"][0]["message"]["content"]

def generate_caption(text):
    prompt = f"""
    Write ONE short and engaging social media caption.

    Rules:
    - Only 1 caption
    - No multiple options
    - No numbering
    - Keep it under 2 lines
    - Add emojis

    Content: {text}
    """
    return call_ai(prompt)


def generate_hashtags(text):
    prompt = f"""
    Generate 5 to 8 relevant hashtags.

    Rules:
    - Only hashtags
    - No explanation
    - One line only

    Content: {text}
    """
    return call_ai(prompt)


def platform_format(text, platform):
    prompt = f"""
    Format this content for {platform}:

    - LinkedIn → professional
    - Twitter → short & engaging
    - Instagram → casual + emojis + hashtags

    Content: {text}
    """

    return call_ai(prompt)

def best_time_to_post(text):
    prompt = f"""
    Suggest ONE best time to post this content.

    Rules:
    - Give only one time
    - Format: HH:MM AM/PM
    - No explanation
    - No paragraphs

    Content: {text}
    """
    return call_ai(prompt)

def predict_engagement(text):
    prompt = f"""
    Predict engagement level for this content.

    Rules:
    - Answer only one word: Low, Medium, or High
    - No explanation
    - No extra text

    Content: {text}
    """
    return call_ai(prompt)

def optimize_content(text):
    prompt = f"""
    Rewrite this content for social media.

    Rules:
    - Maximum 2 lines
    - Engaging and catchy
    - Add emojis
    - No explanation
    - No headings
    - No bullet points

    Content: {text}
    """
    return call_ai(prompt)
