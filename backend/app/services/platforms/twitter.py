from .base import BasePlatform

class TwitterPlatform(BasePlatform):
    def publish(self, content):
        if len(content) > 280:
            parts = [content[i:i+280] for i in range(0, len(content), 280)]
            for i, part in enumerate(parts):
                print(f"Tweet {i+1}: {part}")
        else:
            print(f"Posting to Twitter: {content}")

        return {"status": "success", "platform": "Twitter"}