from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('check-auth/', views.check_auth, name='check_auth'),
    path('upload-files/', views.upload_files, name='upload_files'),
    path('user-resume/', views.get_user_resume, name='get_user_resume'),
    path('get-position/', views.get_user_position, name='get-position'),
    path('email-history/', views.get_email_history, name='email_history'),
    path('application-history/', views.get_application_history, name='application_history'),
    path('download-file/<int:application_id>/<str:file_type>/', views.download_file, name='download_file'),
]
