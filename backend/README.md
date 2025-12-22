```shell
python manage.py runserver 0.0.0.0:8000 # Entrar a localhost:8000 o sino usar el 3000

python manage.py makemigrations

python manage.py migrate

python manage.py createsuperuser

python manage.py shell < code_python.py # para correr python scripts 

python manage.py flush # Borrar los registros pero no las tablas

# para migrar el esquema compartido (solo crear tablas de public)
python manage.py migrate_schemas --shared

# para crear un tenant (se puede usar la shell)
python manage.py create_tenant --domain-domain=newtenant.net --schema_name=new_tenant --name=new_tenant --description="New tenant"

# para crear un superusuario en un tenant especifico
python manage.py create_tenant_superuser --username=colegio --email=colegio@gmail.com --schema=public

# para eliminar un tenant
python manage.py delete_tenant --schema=simon_pedro_ii

# para clonar un tennant 
python manage.py clone_tenant --clone_from=simon_pedro_ii --name=simon_pedro_iii

# para renombrar un tennant
python manage.py rename_schema --rename_from old_name --rename_to new_name
```
