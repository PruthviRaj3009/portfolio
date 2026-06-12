from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)  # "Python & Django Developer"
    bio = models.TextField()  # about me paragraph
    profile_image = models.ImageField(upload_to="profile/", blank=True, null=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=100)  # "Solapur, Maharashtra"
    resume_url = models.URLField(blank=True)

    # Social links
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    leetcode_url = models.URLField(blank=True)
    whatsapp_number = models.CharField(max_length=20, blank=True)  # +91XXXXXXXXXX

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Profile"


class Project(models.Model):
    title = models.CharField(max_length=200)
    short_description = models.CharField(max_length=300)  # shown on card
    full_description = models.TextField()  # shown on detail page
    tech_stack = models.JSONField(default=list)  # ["Django", "React"]
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    demo_video_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)  # show on homepage
    order = models.IntegerField(default=0)  # display order
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["order"]  # auto sort by order


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ("language", "Programming Language"),
        ("framework", "Framework"),
        ("database", "Database"),
        ("tool", "Tool"),
        ("other", "Other"),
    ]
    name = models.CharField(max_length=100)  # "Python"
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    icon_url = models.URLField(blank=True)  # optional icon image
    order = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name} ({self.category})"

    class Meta:
        ordering = ["order"]


class Education(models.Model):
    degree = models.CharField(max_length=200)  # "B.E. Computer Engineering"
    institution = models.CharField(max_length=200)  # "XYZ College, Solapur"
    start_year = models.CharField(max_length=10)  # "2022"
    end_year = models.CharField(max_length=10)  # "2026" or "Present"
    grade = models.CharField(max_length=50, blank=True)  # "8.5 CGPA"
    description = models.TextField(blank=True)  # extra details
    order = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.degree} - {self.institution}"

    class Meta:
        ordering = ["order"]


class Experience(models.Model):
    company = models.CharField(max_length=200)
    role = models.CharField(max_length=200)  # "Django Developer Intern"
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)  # null = currently working
    is_current = models.BooleanField(default=False)  # "Present" badge
    description = models.TextField()  # what you did
    order = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.role} at {self.company}"

    class Meta:
        ordering = ["order"]


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)  # mark read in admin

    def __str__(self):
        return f"{self.name} - {self.sent_at.strftime('%d %b %Y')}"

    class Meta:
        ordering = ["-sent_at"]


class Certificate(models.Model):
    title = models.CharField(max_length=200)  # "Django REST Framework"
    issuer = models.CharField(max_length=200)  # "Udemy"
    issued_date = models.DateField()
    certificate_url = models.URLField(blank=True)  # link to certificate
    image = models.ImageField(upload_to="certificates/", blank=True, null=True)
    order = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.title} - {self.issuer}"

    class Meta:
        ordering = ["order"]  # latest message first


class ExperiencePoint(models.Model):
    experience = models.ForeignKey(
        Experience,
        on_delete=models.CASCADE,
        related_name="points",
    )
    point = models.CharField(max_length=300)
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.point

    class Meta:
        ordering = ["order"]


class Accolade(models.Model):
    CATEGORY_CHOICES = [
        ("achievement", "Achievement"),
        ("award", "Award"),
        ("recognition", "Recognition"),
        ("competition", "Competition"),
        ("other", "Other"),
    ]
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200)
    category = models.CharField(
        max_length=50, choices=CATEGORY_CHOICES, default="achievement"
    )
    date = models.DateField()
    description = models.TextField(blank=True)
    certificate_url = models.URLField(blank=True)
    image = models.ImageField(upload_to="accolades/", blank=True, null=True)
    order = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.title} - {self.issuer}"

    class Meta:
        ordering = ["order"]


class HeroTypingText(models.Model):
    text = models.CharField(max_length=100)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.text

    class Meta:
        ordering = ["order"]


class ExperienceYearCount(models.Model):
    Startyear = models.DateField()  # "2020", "2021", "2022", "2023", "2024"
    Endyear = models.DateField()  # "2020", "2021", "2022", "2023", "2024"
    count = models.IntegerField(default=0)
    # number of projects in that year

    def __str__(self):
        return f"{self.Startyear.year} - {self.Endyear.year}"
