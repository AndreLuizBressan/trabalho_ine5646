from users.mixins import ExtractUserIdMixin
from users.models import User
from users.serializers import UserValidationSerializer, UserInfoSerializer, UserUpdateSerializer

from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

class RegisterUserView(APIView, ExtractUserIdMixin):

    permission_classes = [AllowAny]

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
    
class UpdateUserView(APIView, ExtractUserIdMixin):
    
    def patch(self, request):
        serializer = UserUpdateSerializer(data=request.data)
        if serializer.is_valid():
            user = self.retrieve_user()
            valid_data = serializer.validated_data
            if valid_data.get("name"):
                user.name = valid_data["name"]

            if valid_data.get("old_password") and valid_data.get("new_password"):
                correct_old_password = user.check_password(valid_data["old_password"])
                if correct_old_password:
                    user.set_password(valid_data["new_password"])
                else:
                    return Response({"message": "your current password didn't match"}, status=status.HTTP_403_FORBIDDEN)
            user.save()
            return Response({"message": "user info updated succesfully"}, status=status.HTTP_200_OK)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserInfoView(APIView, ExtractUserIdMixin):

    serializer_class = UserInfoSerializer

    def get(self, request):
        user = get_object_or_404(User, id=self.user_id)
        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)