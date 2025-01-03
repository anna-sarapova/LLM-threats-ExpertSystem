from django.db import models

class Question(models.Model):
    text = models.TextField()
    next_question = models.ForeignKey(
        'self', null=True, blank=True, on_delete=models.SET_NULL
    )
    is_final = models.BooleanField(default=False)  # Indicates if this is the last question
    answer = models.ForeignKey(  # Links to a Threat if it's the final question
        'Threat', null=True, blank=True, on_delete=models.SET_NULL
    )

    def __str__(self):
        return self.text

class Option(models.Model):
    question = models.ForeignKey(
        Question, related_name='options', on_delete=models.CASCADE
    )
    text = models.TextField()
    next_question = models.ForeignKey(
        Question, null=True, blank=True, on_delete=models.SET_NULL
    )
    threat = models.ForeignKey(
        'Threat', null=True, blank=True, on_delete=models.SET_NULL
    )
    is_final = models.BooleanField(default=False)

    def __str__(self):
        return self.text



class Threat(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    impact = models.TextField(default="Impact not specified")
    mitigation = models.TextField(default="Mitigation strategy not specified")

    def __str__(self):
        return self.name
