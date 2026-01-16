import socket, sys
from backend.config.env import Env

try:
    with socket.create_connection((Env.POSTGRES_HOST, Env.POSTGRES_PORT), timeout=2):
        sys.exit(0)
except OSError:
    sys.exit(1)
