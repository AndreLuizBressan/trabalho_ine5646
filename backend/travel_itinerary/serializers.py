from travel_itinerary.models import TravelItinerary
from rest_framework import serializers

class TravelItinerarySerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelItinerary
        fields = "__all__"
        read_only_fields = ['owner']