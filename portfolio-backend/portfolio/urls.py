from django.http import JsonResponse
from django.urls import path
from . import views

urlpatterns = [
    path("profile/", views.ProfileView.as_view(), name="profile"),
    path("projects/", views.ProjectListView.as_view(), name="projects"),
    path("skills/", views.SkillListView.as_view(), name="skills"),
    path("education/", views.EducationListView.as_view(), name="education"),
    path("experience/", views.ExperienceListView.as_view(), name="experience"),
    path("certificates/", views.CertificateListView.as_view(), name="certificates"),
    path("accolades/", views.AccoladeListView.as_view(), name="accolades"),
    path("contact/", views.ContactView.as_view(), name="contact"),
    path("hero-texts/", views.HeroTypingTextView.as_view(), name="hero-texts"),
    path(
        "message-display/", views.MessageDisplayView.as_view(), name="message-display"
    ),
    path("slogans/", views.SloganView.as_view(), name="slogans"),
]
