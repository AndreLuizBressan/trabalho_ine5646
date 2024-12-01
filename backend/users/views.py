from users.mixins import ExtractUserIdMixin
from users.models import User
from users.serializers import UserValidationSerializer, UserInfoSerializer

from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

class RegisterUserView(APIView):

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

    permission_classes = (IsAuthenticated,)
    serializer_class = UserInfoSerializer

    def get(self, request):
        user = get_object_or_404(User, id=self.user_id)
        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)