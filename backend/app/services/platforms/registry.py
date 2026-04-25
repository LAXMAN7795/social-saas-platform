from .twitter import TwitterPlatform
from .linkedin import LinkedInPlatform
from app.services.platforms.telegram import publish_telegram

platform_registry = {
    "Telegram": publish_telegram
}
