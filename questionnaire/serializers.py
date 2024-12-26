from rest_framework import serializers
from questionnaire.models import Question, Option, Threat

class OptionSerializer(serializers.ModelSerializer):
    next_question_id = serializers.PrimaryKeyRelatedField(source='next_question', read_only=True)
    threat_id = serializers.PrimaryKeyRelatedField(source='threat', read_only=True)

    class Meta:
        model = Option
        fields = ['id', 'text', 'next_question_id', 'threat_id', 'is_final']

class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'is_final', 'answer', 'options']

class ThreatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Threat
        fields = ['id', 'name', 'description', 'impact', 'mitigation']
