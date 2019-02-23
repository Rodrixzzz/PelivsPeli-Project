# Elige la imagen de Ubuntu
FROM ubuntu:trusty

# Autor
MAINTAINER RoD

# Instalar Node.js y algunas dependencias
RUN apt-get update && \
    apt-get -y install curl && \
    curl -sL https://deb.nodesource.com/setup_6.x | sudo bash - && \
    apt-get -y install python build-essential nodejs

# Pasa módulos de node (node_modules) para caché
ADD package.json /servidor/package.json

# Elige el directorio de trabajo
WORKDIR /servidor

EXPOSE 8080 3600 

# Instala dependencias
RUN npm install

# Copia del directorio donde está el código al directorio dentro del container donde se va a ejecutar
COPY ["/src", "/servidor/src"]

# Inicia el proceso de NODE
CMD ["node", "/servidor/src/server.js"]

# docker run -p 8000:8080 -it --env-file ./src/Lib/.env --link mysql servernode
# docker run -p 8000:8080 -it --env-file .env --link mysql servernode sobre lib
# docker build -t servernode . sobre archivo docker
# docker container ls -a
# docker container ls -a
