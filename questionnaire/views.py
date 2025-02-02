from rest_framework.generics import RetrieveAPIView, ListAPIView
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .serializers import QuestionSerializer, ThreatSerializer
from .models import Question, Option, Threat


class QuestionDetailView(RetrieveAPIView):
    """
    Retrieve details of a specific question.
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class ThreatDetailView(RetrieveAPIView):
    """
    Retrieve details of a specific threat.
    """
    queryset = Threat.objects.all()
    serializer_class = ThreatSerializer


class ThreatDictionaryList(ListAPIView):
    """
    Retrieve a list of all threats in alphabetical order.
    """
    queryset = Threat.objects.all().order_by('name')
    serializer_class = ThreatSerializer


def get_starting_question(request):
    """
    Fetch the starting question in the decision tree.
    """
    try:
        question = Question.objects.filter(is_final=False).first()
        options = Option.objects.filter(question=question)
        return JsonResponse({
            'id': question.id,
            'text': question.text,
            'is_final': question.is_final,
            'options': [
                {
                    'id': option.id,
                    'text': option.text,
                    'next_question_id': option.next_question.id if option.next_question else None,
                    'threat_id': option.threat.id if option.threat else None,
                    'is_final': option.is_final,
                }
                for option in options
            ]
        })
    except Question.DoesNotExist:
        return JsonResponse({'error': 'No starting question found.'}, status=404)


def get_question(request, question_id):
    """
    Fetch details of a specific question.
    """
    question = get_object_or_404(Question, id=question_id)

    response_data = {
        "id": question.id,
        "text": question.text,
        "is_final": question.is_final,
        "options": []
    }

    if question.is_final and question.answer:
        response_data["answer"] = {
            "id": question.answer.id,
            "name": question.answer.name,
            "description": question.answer.description,
            "impact": question.answer.impact,
            "mitigation": question.answer.mitigation,
        }
    else:
        for option in question.options.all():
            response_data["options"].append({
                "id": option.id,
                "text": option.text,
                "next_question_id": option.next_question.id if option.next_question else None,
                "threat_id": option.threat.id if option.threat else None,
                "is_final": option.is_final,
            })

    return JsonResponse(response_data)


def get_threat_details(request, threat_id):
    """
    Fetch details of a specific threat.
    """
    try:
        threat = Threat.objects.get(id=threat_id)
        return JsonResponse({
            'id': threat.id,
            'name': threat.name,
            'description': threat.description,
            'impact': threat.impact,
            'mitigation': threat.mitigation
        })
    except Threat.DoesNotExist:
        return JsonResponse({'error': 'Threat not found.'}, status=404)
