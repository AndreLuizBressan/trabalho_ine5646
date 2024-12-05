from django.urls import path
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(permission_classes=[AllowAny])),
    path('token/refresh/', TokenRefreshView.as_view())
]
