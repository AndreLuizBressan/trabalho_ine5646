class ExtractUserIdMixin:

    @property
    def user_id(self):
        return self.request.auth.payload.get("user_id") if self.request and self.request.auth else None