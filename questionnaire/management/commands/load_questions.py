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

                # First loop: Create or load questions without linking options or next_question
                questions = {}
                for item in data:
                    question, created = Question.objects.get_or_create(
                        id=item["id"],
                        defaults={"text": item["question"]}
                    )
                    questions[question.id] = question
                    print(f"Question Created/Loaded: {question.id}, Text: {question.text}")

                # Second loop: Update options with is_final logic and link next_question/threats
                for item in data:
                    question = questions[item["id"]]

                    for option_data in item["options"]:
                        next_question = questions.get(option_data.get("next_question_id"))
                        threat_instance = None

                        if option_data.get("is_final") and option_data.get("threat_id"):
                            threat_instance = Threat.objects.get(id=option_data["threat_id"])

                        Option.objects.get_or_create(
                            id=option_data["id"],
                            question=question,
                            defaults={
                                "text": option_data["text"],
                                "next_question": questions.get(option_data.get("next_question_id")),
                                "threat": Threat.objects.get(id=option_data["threat_id"])
                                    if option_data.get("is_final") else None,
                                "is_final": option_data.get("is_final", False),
                            },
                        )

                        print(f"Option Created: {option_data['id']} for Question {question.id}")

                self.stdout.write(self.style.SUCCESS("Decision tree loaded successfully!"))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"File not found: {file_path}"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"An error occurred: {str(e)}"))
