from rest_framework import serializers
from .models import *
from rest_framework.authentication import get_user_model
from datetime import date, timedelta
from config.env import Env
from django_tenants.utils import schema_context
from django.db import transaction


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["id", "email", "username", "first_name", "last_name", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        email = validated_data["email"]
        username = validated_data["username"]
        first_name = validated_data["first_name"]
        last_name = validated_data["last_name"]
        password = validated_data["password"]

        User = get_user_model()
        new_user = User.objects.create(
            email=email, username=username, first_name=first_name, last_name=last_name
        )
        new_user.set_password(password)
        new_user.save()
        return new_user


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        exclude = ["created_on"]


class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = "__all__"


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = "__all__"


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = "__all__"


class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = "__all__"


class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno
        fields = "__all__"


class TenantRegistrationSerializer(serializers.Serializer):
    tenant_name = serializers.CharField(max_length=150)
    manager_name = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def create_tenant_superuser(self, schema_name, username, email, password):
        with schema_context(schema_name):
            User = get_user_model()
            if not User.objects.filter(username=username).exists():
                User.objects.create_superuser(
                    username=username, email=email, password=password
                )
            else:
                raise Exception(
                    f"️Superusuario {username} ya existe en tenant {schema_name}"
                )

    def create(self, validated_data):
        tenant_name = validated_data["tenant_name"]
        manager_name = validated_data["manager_name"]
        email = validated_data["email"]
        password = validated_data["password"]

        try:
            with transaction.atomic():
                # Crear tenant
                tenant = Client.objects.create(
                    schema_name=tenant_name,
                    name=tenant_name,
                    paid_until=date.today() + timedelta(days=15),
                    on_trial=False,
                )

                # Crear dominio principal
                Domain.objects.create(
                    domain=f"{tenant_name}.{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}",
                    is_primary=True,
                    tenant=tenant,
                )

                Domain.objects.create(
                    domain=f"{tenant_name}.{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}.nip.io",
                    is_primary=False,
                    tenant=tenant,
                )

                Domain.objects.create(
                    domain=f"{tenant_name}.{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}.sslip.io",
                    is_primary=False,
                    tenant=tenant,
                )
                self.create_tenant_superuser(tenant_name, manager_name, email, password)
                return {"tenant": tenant_name, "manager": manager_name, "email": email}

        except Exception as e:
            # Aquí cualquier fallo hace rollback automático
            raise serializers.ValidationError(
                {"detail": f"Error creando tenant: {str(e)}"}
            )
