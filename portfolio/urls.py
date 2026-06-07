from django.urls import path
from . import views

urlpatterns = [
    # API endpoints
    path("api/profile/", views.ProfileView.as_view(), name="profile"),
    path("api/projects/", views.ProjectListView.as_view(), name="projects"),
    path("api/skills/", views.SkillListView.as_view(), name="skills"),
    path("api/education/", views.EducationListView.as_view(), name="education"),
    path("api/experience/", views.ExperienceListView.as_view(), name="experience"),
    path("api/certificates/", views.CertificateListView.as_view(), name="certificates"),
    path("api/accolades/", views.AccoladeListView.as_view(), name="accolades"),
    path("api/contact/", views.ContactView.as_view(), name="contact"),
    # Frontend pages
    path("", views.HomeView.as_view(), name="home"),
    path("projects/", views.ProjectsPageView.as_view(), name="projects-page"),
    path("contact/", views.ContactPageView.as_view(), name="contact-page"),
]
