from users.models import User

from rest_framework import serializers

class UserValidationSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    name = serializers.CharField(required=True, min_length=3)
    password = serializers.CharField(write_only=True, required=True, min_length=8)

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Name cannot be blank or whitespace.")
        return value
    
    def create_user(self, validated_data):
        """
        Creates a user in the database.
        """
        user = User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password']
        )
        user.first_name = validated_data['name']
        user.save()
        return user
    
class UserUpdateSerializer(serializers.Serializer):
    name = serializers.CharField(min_length=3, required = False)
    old_password = serializers.CharField(write_only=True, required = False, min_length=8)
    new_password = serializers.CharField(write_only=True, required = False, min_length=8)

    def to_internal_value(self, data):
        for field in data:
            if field not in self.fields:
                raise serializers.ValidationError({field: "This field is not allowed."})
        return super().to_internal_value(data)

class UserInfoSerializer(serializers.Serializer):
    email = serializers.EmailField()
    name = serializers.CharField(required=True)