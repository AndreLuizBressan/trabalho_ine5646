from travel_itinerary.models import TravelItinerary, ItineraryItems, ItineraryInvites
from travel_itinerary.serializers import TravelItinerarySerializer, ItineraryItemsSerializer, ItineraryInvitesSerializer, ItineratyInvitesFullInformationSerializer
from users.mixins import ExtractUserIdMixin

from rest_framework import status
from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet

class TravelItineraryView(ModelViewSet, ExtractUserIdMixin):
    queryset = TravelItinerary.objects.all().order_by("-created_at")
    serializer_class = TravelItinerarySerializer

    def get_queryset(self):
        queryset = self.queryset
        user_filtered_queryset = queryset.filter(owner_id=self.user_id)
        return user_filtered_queryset
        
    def perform_create(self, serializer):
        serializer.save(owner_id=self.user_id)


class ItineraryItemsView(ModelViewSet, ExtractUserIdMixin):
    queryset = ItineraryItems.objects.all().order_by("-created_at")
    serializer_class = ItineraryItemsSerializer

    def get_queryset(self):
        queryset = self.queryset
        user_filtered_queryset = queryset.filter(itinerary__owner_id=self.user_id)
        return user_filtered_queryset
    
class ItineraryInviteView(CreateModelMixin, GenericViewSet, ExtractUserIdMixin):
    queryset = ItineraryInvites.objects.all().order_by("-created_at")
    serializer_class = ItineraryInvitesSerializer

    def check_itinerary_ownership(self, itinerary_id):
        is_owner = TravelItinerary.objects.filter(id=itinerary_id, owner_id=self.user_id).exists()
        return is_owner

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        valid_data = serializer.validated_data
        itinerary_id = valid_data["itinerary"].id
        is_owner = self.check_itinerary_ownership(itinerary_id=itinerary_id)
        if not is_owner:
            return Response({"message": f"you do not own an itinerary with id {itinerary_id}"}, status=status.HTTP_403_FORBIDDEN)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class InvitedItinerariesView(GenericViewSet, ListModelMixin, ExtractUserIdMixin):
    queryset = ItineraryInvites.objects.all().order_by("-id")
    serializer_class = ItineratyInvitesFullInformationSerializer

    def get_queryset(self):
        queryset = self.queryset.filter(user_id=self.user_id)
        return queryset
