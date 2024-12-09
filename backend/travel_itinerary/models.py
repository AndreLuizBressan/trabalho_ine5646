from users.models import User

from django.db import models
from django.core.validators import MinLengthValidator

class TravelItinerary(models.Model):

    created_at = models.DateTimeField("Created at", auto_now_add=True)
    updated_at = models.DateTimeField("Updated at", auto_now=True)
    title = models.CharField(max_length=50, null=False, blank=False, validators=[MinLengthValidator(3)])
    description = models.CharField(max_length=200, null=True, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    owner = models.ForeignKey(
        User,
        related_name="itineraries",
        on_delete=models.CASCADE
    )

class ItineraryItems(models.Model):

    created_at = models.DateTimeField("Created at", auto_now_add=True)
    updated_at = models.DateTimeField("Updated at", auto_now=True)
    day = models.IntegerField(null=False, blank=False)
    destination = models.CharField(max_length=150)
    accommodation = models.CharField(max_length=150)
    activities = models.CharField(max_length=150)
    actions = models.CharField(max_length=150)
    itinerary = models.ForeignKey(
        TravelItinerary,
        related_name="travel_items",
        on_delete=models.CASCADE,
    )

class ItineraryInvites(models.Model):
    created_at = models.DateTimeField("Created at", auto_now_add=True)
    updated_at = models.DateTimeField("Updated at", auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    itinerary = models.ForeignKey(TravelItinerary, on_delete=models.CASCADE)

    def get_owner(self):
        owner_id = self.itinerary.owner_id
        owner = User.objects.filter(id=owner_id).first()
        return owner