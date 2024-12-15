import json
from django.core.management.base import BaseCommand
from questionnaire.models import Threat


class Command(BaseCommand):
    help = "Load threats from JSON"

    def handle(self, *args, **kwargs):
        file_path = "threats.json"

        try:
            with open(file_path, "r") as file:
                data = json.load(file)

                for item in data:
                    Threat.objects.update_or_create(
                        id=item["id"],
                        defaults={
                            "name": item["name"],
                            "description": item["description"],
                            "impact": item["impact"],
                            "mitigation": item["mitigation"],
                        },
                    )

                self.stdout.write(self.style.SUCCESS("Threats loaded successfully!"))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"File not found: {file_path}"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"An error occurred: {str(e)}"))
