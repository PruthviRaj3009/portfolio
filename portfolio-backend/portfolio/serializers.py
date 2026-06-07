from rest_framework import serializers
from .models import (
    Profile,
    Project,
    Skill,
    Education,
    Experience,
    ExperiencePoint,
    Certificate,
    ContactMessage,
    Accolade,
)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = "__all__"


class ExperiencePointSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperiencePoint
        fields = ["id", "point", "order"]


class ExperienceSerializer(serializers.ModelSerializer):
    points = ExperiencePointSerializer(many=True, read_only=True)  # nested points

    class Meta:
        model = Experience
        fields = "__all__"


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = "__all__"


class AccoladeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accolade
        fields = "__all__"


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "subject", "message"]
