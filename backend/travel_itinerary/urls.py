from travel_itinerary.views import TravelItineraryView

from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r"my_itineraries", TravelItineraryView)

urlpatterns = []
urlpatterns = urlpatterns + router.urls