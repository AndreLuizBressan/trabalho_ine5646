from users.models import User

from django.shortcuts import get_object_or_404
class ExtractUserIdMixin:

    @property
    def user_id(self):
        return self.request.auth.payload.get("user_id") if self.request and self.request.auth else None
    
    def retrieve_user(self):
        user = get_object_or_404(User, id=self.user_id)
        return user
