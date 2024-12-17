import json
from django.core.management.base import BaseCommand
from questionnaire.models import Question, Option, Threat

class Command(BaseCommand):
    help = "Load questions and options from JSON"

    def handle(self, *args, **kwargs):
        file_path = "decision_tree.json"

        try:
            with open(file_path, "r") as file:
                data = json.load(file)

                # First loop: Create or load questions without next_question and other fields
                questions = {}
                for item in data:
                    question, created = Question.objects.get_or_create(
                        id=item["id"],
                        defaults={"text": item["question"]}
                    )
                    questions[question.id] = question
                    print(f"Question Created/Loaded: {question.id}, Text: {question.text}")

                # Second loop: Update next_question, is_final, answer, and create options
                for item in data:
                    question = questions[item["id"]]

                    # Update next_question if available
                    next_question_id = item.get("next_question_id")
                    if next_question_id:
                        next_question = questions.get(next_question_id)
                        if next_question:
                            question.next_question = next_question

                    # Set is_final and answer
                    question.is_final = item.get("is_final", False)
                    if item.get("is_final"):
                        question.answer = Threat.objects.filter(id=item.get("answer")).first()

                    question.save()

                    # Create options for the question
                    for option in item["options"]:
                        threat_instance = None
                        if option.get("threat_id"):
                            threat_instance = Threat.objects.get(id=option["threat_id"])

                        Option.objects.get_or_create(
                            id=option["id"],
                            question=question,
                            defaults={
                                "text": option["text"],
                                "next_question": questions.get(option.get("next_question_id")),
                                "threat": threat_instance,
                            },
                        )
                        print(f"Option Created: {option['id']} for Question {question.id}")

                self.stdout.write(self.style.SUCCESS("Decision tree loaded successfully!"))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"File not found: {file_path}"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"An error occurred: {str(e)}"))
