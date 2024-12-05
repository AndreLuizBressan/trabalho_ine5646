from travel_itinerary.models import TravelItinerary
from travel_itinerary.serializers import TravelItinerarySerializer
from users.mixins import ExtractUserIdMixin

from rest_framework import viewsets


class TravelItineraryView(viewsets.ModelViewSet, ExtractUserIdMixin):
    queryset = TravelItinerary.objects.all().order_by("-created_at")
    serializer_class = TravelItinerarySerializer

    def get_queryset(self):
        queryset = self.queryset
        user_filtered_queryset = queryset.filter(owner_id=self.user_id)
        return user_filtered_queryset
        
    def perform_create(self, serializer):
        serializer.save(owner_id=self.user_id)
