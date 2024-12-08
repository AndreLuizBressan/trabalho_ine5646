from travel_itinerary.models import TravelItinerary, ItineraryItems
from rest_framework import serializers

class ItineraryItemsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ItineraryItems
        fields = "__all__"

    def to_internal_value(self, data):
        for field in data:
            if field not in self.fields:
                raise serializers.ValidationError({field: "This field is not allowed."})
        return super().to_internal_value(data)
    
class TravelItinerarySerializer(serializers.ModelSerializer):

    travel_items = ItineraryItemsSerializer(many=True, read_only = True)
    class Meta:
        model = TravelItinerary
        fields = "__all__"
        read_only_fields = ['owner']
