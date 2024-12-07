from django.urls import path
from users.views import RegisterUserView, UserInfoView, UserUpdateView


urlpatterns = [
    path('register/', RegisterUserView.as_view()),
    path('info/', UserInfoView.as_view()),
    path('update/', UserUpdateView.as_view())
]