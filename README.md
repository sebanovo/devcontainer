```shell
# para saber la ip de mi maquina dentro de la red local (LAN)
ipconfig
# para saber la ip de mi telefono dentro de la red local (LAN)
adb shell ip addr show wlan0
# para saber cuales dispositivos estan conectados a mi pc
adb devices
# para para el servidor de adb y poder retirar el telefono
adb kill-server
# para volver a encenederlo
adb start-server
```

## Tips

- Al conectar el dispositivo movil al pc seleccionar sin transferencia de datos
- Prender el modo Depurar por USB (En el modo desarrollador del telefono)

```shell
# para leventar el contenedor de produccion y construirlo
docker compose up --build

# para detener los contenedores
docker compose stop

# para borrar los datos del contenedores y sus volumenes
docker compose down -v

# para borrar todo lo que no este corriendo (contenedores, volumenes, etc)
docker system prune -a
```