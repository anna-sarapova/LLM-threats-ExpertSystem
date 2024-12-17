from rest_framework import serializers
from .models import Question, Option, Threat

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'text', 'next_question', 'threat_id']

class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'next_question', 'options']

class ThreatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Threat
        fields = ['id', 'name', 'description', 'impact', 'mitigation']
