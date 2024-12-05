from users.mixins import ExtractUserIdMixin
from users.models import User

from django.db import models
from django.core.validators import MinLengthValidator

class TravelItinerary(models.Model, ExtractUserIdMixin):

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
