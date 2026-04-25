from .base import BasePlatform

class LinkedInPlatform(BasePlatform):
    def publish(self, content):
        print(f"Posting to LinkedIn: {content}")
        return {"status": "success", "platform": "LinkedIn"}