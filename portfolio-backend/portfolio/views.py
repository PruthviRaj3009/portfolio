from django.core.mail import send_mail
from django.conf import settings
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics


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
from .serializers import (
    HeroTypingTextSerializer,
    MessageDisplaySerializer,
    ProfileSerializer,
    ProjectSerializer,
    SkillSerializer,
    EducationSerializer,
    ExperienceSerializer,
    CertificateSerializer,
    ContactMessageSerializer,
    AccoladeSerializer,
    HeroTypingTextSerializer,
    SloganSerializer,
)

# ── API Views ──────────────────────────────────────────────


class SloganView(APIView):
    def get(self, request):
        slogan = Slogan.objects.first()
        serializer = SloganSerializer(slogan)
        return Response(serializer.data)


class MessageDisplayView(generics.RetrieveAPIView):
    serializer_class = MessageDisplaySerializer

    def get_object(self):
        return MessageDisplay.objects.first()


class MessageDisplayView(generics.RetrieveAPIView):
    serializer_class = MessageDisplaySerializer

    def get_object(self):
        return MessageDisplay.objects.first()


class ProfileView(RetrieveAPIView):
    serializer_class = ProfileSerializer

    def get_object(self):
        return Profile.objects.first()


class ProjectListView(ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class SkillListView(ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class HeroTypingTextView(ListAPIView):
    queryset = HeroTypingText.objects.filter(is_active=True)
    serializer_class = HeroTypingTextSerializer


class EducationListView(ListAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class ExperienceListView(ListAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class CertificateListView(ListAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer


class AccoladeListView(ListAPIView):
    queryset = Accolade.objects.all()
    serializer_class = AccoladeSerializer


class ContactView(APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)

        if serializer.is_valid():
            message = serializer.save()

            try:
                send_mail(
                    subject=f"Portfolio message from {message.name}",
                    message=f"Name: {message.name}\nEmail: {message.email}\n\nMessage:\n{message.message}",
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[settings.EMAIL_HOST_USER],
                )
            except Exception as e:
                print(f"Email error: {e}")

            return Response(
                {"success": "Message sent successfully"}, status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
