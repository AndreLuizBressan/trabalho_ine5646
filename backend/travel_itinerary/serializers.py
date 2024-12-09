from travel_itinerary.models import TravelItinerary, ItineraryItems, ItineraryInvites
from users.serializers import UserModelSerializer

from rest_framework.serializers import ModelSerializer, ValidationError

class ItineraryItemsSerializer(ModelSerializer):
    
    class Meta:
        model = ItineraryItems
        fields = "__all__"

    def to_internal_value(self, data):
        for field in data:
            if field not in self.fields:
                raise ValidationError({field: "This field is not allowed."})
        return super().to_internal_value(data)
    
class TravelItinerarySerializer(ModelSerializer):

    travel_items = ItineraryItemsSerializer(many=True, read_only = True)
    class Meta:
        model = TravelItinerary
        fields = "__all__"
        read_only_fields = ['owner']

class ItineraryInvitesSerializer(ModelSerializer):
    class Meta:
        model = ItineraryInvites
        fields = "__all__"

class ItineratyInvitesFullInformationSerializer(ModelSerializer):
    owner = UserModelSerializer(source="get_owner")
    itinerary = TravelItinerarySerializer()
    class Meta:
        model = ItineraryInvites
        fields = ["owner", "itinerary", "created_at", "updated_at"]
