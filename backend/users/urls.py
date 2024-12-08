from django.urls import path
from users.views import RegisterUserView, UserInfoView, UpdateUserView


urlpatterns = [
    path('register/', RegisterUserView.as_view()),
    path('update/', UpdateUserView.as_view()),
    path('info/', UserInfoView.as_view())
]