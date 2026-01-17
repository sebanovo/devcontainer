from .user_seeder import UserSeeder
from .group_seeder import GroupSeeder
from .user_groups_seeder import UserGroupsSeeder


class DatabaseSeeder:
    @staticmethod
    def run(stdout, style):
        seeders = [
            GroupSeeder,
            UserSeeder,
            UserGroupsSeeder,
        ]

        try:
            for seeder in seeders:
                stdout.write(style.WARNING(f"Seeding in Tenants {seeder.__name__}..."))
                seeder.run()
                stdout.write(style.SUCCESS("Seeding in Tenants completado."))
        except Exception as e:
            raise e
