from django.urls import path
from . import views
from .views import ThreatDictionaryList

urlpatterns = [
    path('start/', views.get_starting_question, name='get_starting_question'),
    path('questions/<int:question_id>/', views.get_question, name='get_question'),
    path('threats/<int:threat_id>/', views.get_threat_details, name='get_threat_details'),
    path('threats/', ThreatDictionaryList.as_view(), name='threat-list'),
]
