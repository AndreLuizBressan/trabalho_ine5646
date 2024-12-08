from django.urls import path
from users.views import RegisterUserView, UserInfoView, UpdateUserView, UserByEmailView

from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r"search_user", UserByEmailView)

urlpatterns = [
    path('register/', RegisterUserView.as_view()),
    path('update/', UpdateUserView.as_view()),
    path('info/', UserInfoView.as_view())
]
urlpatterns = urlpatterns + router.urls