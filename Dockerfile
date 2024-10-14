# Usando Node.js versión 20 con Alpine para mantener el tamaño del contenedor pequeño
FROM node:20-alpine
# Establece el directorio de trabajo en el contenedor para organizar mejor los archivos
WORKDIR /usr/src/app

# Copio 'package.json' y 'package-lock.json' para manejar las dependencias
COPY package*.json ./

# Instalo solo las dependencias necesarias para ejecutar la aplicación, sin las de desarrollo
RUN npm install --only=production

# Copio el resto de los archivos del proyecto al contenedor
COPY . .

# Dejo disponible el puerto 3000 para que se pueda acceder al servidor desde fuera
EXPOSE 3000

# Defino el comando para arrancar la aplicación cuando se inicie el contenedor
CMD ["node", "index.js"]
