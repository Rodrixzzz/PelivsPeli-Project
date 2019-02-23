FROM mysql:5.7.25

MAINTAINER RoD

ENV MYSQL_DATABASE=competencias \
    MYSQL_ROOT_PASSWORD=leonmordelon

ADD ScriptFinal.sql /docker-entrypoint-initdb.d

EXPOSE 3306