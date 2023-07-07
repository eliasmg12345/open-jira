#next 
para correr localmente, se necesita la bd

docker-compose up -d

* El -d, SIGNIFICA __detached__

* mongoDB URL local:

mongodb://localhost:27017/entriesdb

##Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

##llenar la bd con informacion de preuebas

Llamar a:
```
http://localhost:3000/api/seed
```