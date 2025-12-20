import socket, sys
from pathlib import Path
import environ

BASE_DIR = Path(__file__).resolve().parent
env = environ.Env(DEBUG=(bool, False))

environ.Env.read_env(BASE_DIR / ".env")

HOST = env("POSTGRES_HOST")
PORT = env("POSTGRES_PORT")

try:
    with socket.create_connection((HOST, PORT), timeout=2):
        sys.exit(0)
except OSError:
    sys.exit(1)