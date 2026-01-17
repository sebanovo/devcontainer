from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django_tenants.utils import schema_context


class UserGroupsSeeder:
    @staticmethod
    def assign_user_to_group(schema_name, username, group_name):
        with schema_context(schema_name):
            User = get_user_model()
            try:
                user = User.objects.get(username=username)
                group = Group.objects.get(name=group_name)
                user.groups.add(group)
                user.save()
            except User.DoesNotExist as e:
                raise e

    @staticmethod
    def run():
        # Definimos los emparejamientos por tenant
        try:
            assignments = {
                "aleman": {
                    "messi": "estudiante",
                    "ronaldo": "estudiante",
                    "alonso": "profesor",
                    "zidane": "directivo",
                    "alvarez": "tutor",
                },
                "espiritu-santo": {
                    "messi": "estudiante",
                    "ronaldo": "estudiante",
                    "alonso": "profesor",
                    "zidane": "directivo",
                    "alvarez": "tutor",
                },
                "boliviano-americano": {
                    "messi": "estudiante",
                    "ronaldo": "estudiante",
                    "alonso": "profesor",
                    "zidane": "directivo",
                    "alvarez": "tutor",
                },
                "britanico-santa-cruz": {
                    "messi": "estudiante",
                    "ronaldo": "estudiante",
                    "alonso": "profesor",
                    "zidane": "directivo",
                    "alvarez": "tutor",
                },
            }

            # Ejecutamos las asignaciones
            for schema, mapping in assignments.items():
                for username, group_name in mapping.items():
                    UserGroupsSeeder.assign_user_to_group(schema, username, group_name)
        except Exception as e:
            raise e
