from travel_itinerary.views import TravelItineraryView, ItineraryItemsView, ItineraryInviteView

from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r"my_itineraries", TravelItineraryView)
router.register(r"itinerary_items", ItineraryItemsView)
router.register(r"invite", ItineraryInviteView)

urlpatterns = []
urlpatterns = urlpatterns + router.urls