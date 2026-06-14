from rest_framework import serializers
from .models import (
    HeroTypingText,
    Profile,
    Project,
    Skill,
    Education,
    Experience,
    ExperiencePoint,
    Certificate,
    ContactMessage,
    Accolade,
    HeroTypingText,
    MessageDisplay,
    Slogan,
)


class MessageDisplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = MessageDisplay
        fields = ["available", "experience", "notice_period"]


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class SloganSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slogan
        fields = ["text"]


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


class HeroTypingTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroTypingText
        fields = ["id", "text", "order"]


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
