from django.contrib import admin
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
    HeroTypingText,
    ExperienceYearCount,
)
from .models import HeroTypingText


@admin.register(HeroTypingText)
class HeroTypingTextAdmin(admin.ModelAdmin):
    list_display = ["text", "order", "is_active"]
    list_editable = ["order", "is_active"]


class ExperiencePointInline(admin.TabularInline):
    model = ExperiencePoint
    extra = 3
    ordering = ["order"]


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ["name", "title", "email", "location"]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "is_featured", "order"]
    list_editable = ["is_featured", "order"]
    list_filter = ["is_featured"]
    search_fields = ["title", "short_description"]


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "order"]
    list_editable = ["category", "order"]
    list_filter = ["category"]


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ["degree", "institution", "start_year", "end_year", "grade", "order"]
    list_editable = ["order"]


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ["role", "company", "start_date", "end_date", "is_current", "order"]
    list_editable = ["is_current", "order"]
    list_filter = ["is_current"]
    inlines = [ExperiencePointInline]


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ["title", "issuer", "issued_date", "order"]
    list_editable = ["order"]


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "subject", "sent_at", "is_read"]
    list_editable = ["is_read"]
    list_filter = ["is_read"]
    readonly_fields = ["name", "email", "subject", "message", "sent_at"]


@admin.register(Accolade)
class AccoladeAdmin(admin.ModelAdmin):
    list_display = ["title", "issuer", "category", "date", "order"]
    list_editable = ["order"]
    list_filter = ["category"]
    search_fields = ["title", "issuer"]


@admin.register(ExperienceYearCount)
class ExperienceYearCountAdmin(admin.ModelAdmin):
    list_display = ["count"]
