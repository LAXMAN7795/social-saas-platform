class BasePlatform:
    def authenticate(self):
        raise NotImplementedError

    def publish(self, content):
        raise NotImplementedError

    def get_status(self, post_id):
        raise NotImplementedError