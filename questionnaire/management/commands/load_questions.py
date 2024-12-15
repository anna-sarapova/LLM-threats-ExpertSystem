import json
from django.core.management.base import BaseCommand
from questionnaire.models import Question, Option

class Command(BaseCommand):
    help = "Load questions and options from JSON"

    def handle(self, *args, **kwargs):
        file_path = "decision_tree.json"

        try:
            with open(file_path, "r") as file:
                data = json.load(file)

                # Step 1: Create questions without next_question_id
                questions = {}
                for item in data:
                    question, created = Question.objects.get_or_create(
                        id=item["id"],
                        defaults={"text": item["question"]}
                    )
                    questions[question.id] = question
                    print(f"Question Created/Loaded: {question.id}, Text: {question.text}")

                # Step 2: Update next_question and create options
                # for item in data:
                #     question = questions[item["id"]]
                #
                #     # Update next_question field if it exists
                #     if item.get("next_question_id"):
                #         next_question = questions.get(item["next_question_id"])
                #         if next_question:
                #             question.next_question = next_question
                #             question.save()
                #             print(f"Updated Next Question for ID {question.id}: {next_question.id}")
                #         else:
                #             print(f"Warning: Next Question ID {item['next_question_id']} not found for Question ID {question.id}")
                for item in data:
                    question = questions[item["id"]]
                    next_question_id = item.get("next_question_id")
                    if next_question_id:
                        next_question = questions.get(next_question_id)
                        if next_question:
                            question.next_question = next_question
                            question.save()
                            print(f"Updated Next Question for ID {question.id}: {next_question.id}")
                        else:
                            print(f"Next Question ID {next_question_id} not found for Question ID {question.id}")

                    # Create options
                    for option in item["options"]:
                        Option.objects.get_or_create(
                            id=option["id"],
                            question=question,
                            defaults={
                                "text": option["text"],
                                "next_question": questions.get(option.get("next_question_id")),
                                "threat_id": option.get("threat_id"),
                            },
                        )
                        print(f"Option Created: {option['id']} for Question {question.id}")

                self.stdout.write(self.style.SUCCESS("Decision tree loaded successfully!"))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"File not found: {file_path}"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"An error occurred: {str(e)}"))
