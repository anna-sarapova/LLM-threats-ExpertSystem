from django.contrib import admin
from .models import Threat, Question, Option

@admin.register(Threat)
class ThreatAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'impact', 'mitigation')
    search_fields = ('name', 'description', 'impact', 'mitigation')
    list_filter = ('name',)

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'text', 'next_question')
    search_fields = ('text',)
    list_filter = ('next_question',)

    def get_next_question(self, obj):
        return obj.next_question.text if obj.next_question else "None"

    get_next_question.short_description = "Next Question"

@admin.register(Option)
class OptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'text', 'question', 'next_question', 'threat')
    search_fields = ('text',)
    list_filter = ('question', 'threat')
