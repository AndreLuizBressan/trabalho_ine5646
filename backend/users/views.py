from users.mixins import ExtractUserIdMixin
from users.models import User
from users.serializers import UserValidationSerializer, UserInfoSerializer, UserUpdateSerializer

from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

class RegisterUserView(APIView):

    permission_classes = [AllowAny]
    serializer_class = UserValidationSerializer

    def post(self, request):
        serializer = UserValidationSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.create_user(serializer.validated_data)
                return Response(
                    {"message": "User created successfully", "user_id": user.id},
                    status=status.HTTP_201_CREATED
                )
            except IntegrityError:
                return Response({"message": "This email address is taken"}, status=status.HTTP_400_BAD_REQUEST)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserInfoView(APIView, ExtractUserIdMixin):

    serializer_class = UserInfoSerializer

    def get(self, request):
        user = get_object_or_404(User, id=self.user_id)
        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserUpdateView(APIView, ExtractUserIdMixin):
    serializer_class = UserUpdateSerializer

    def get(self, request):
        """
        Retorna as informações do usuário.
        """
        user = get_object_or_404(User, id=self.user_id)
        data = {
            "name": user.get_full_name(),  # Assuming 'name' refers to the full name
            "password": user.password  # Returning the password (NOT recommended in production)
        }
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Atualiza as informações do usuário.
        """
        user = get_object_or_404(User, id=self.user_id)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            updated_user = serializer.update_user(user, serializer.validated_data)
            return Response(
                {"message": "User updated successfully", "user_id": updated_user.id},
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
