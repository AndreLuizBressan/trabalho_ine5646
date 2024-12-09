from travel_itinerary.views import TravelItineraryView, ItineraryItemsView, ItineraryInviteView, InvitedItinerariesView

from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r"my_itineraries", TravelItineraryView)
router.register(r"itinerary_items", ItineraryItemsView)
router.register(r"invite", ItineraryInviteView)
router.register(r"invited_itinerarires", InvitedItinerariesView, basename="invited_itineraries")

urlpatterns = []
urlpatterns = urlpatterns + router.urls