# перезапуск контейнера
# $1 - имя образа
# $2 - исходный порт
# $3 - порт контейнера
docker pull "$1"
docker ps -f "publish=$2" --format '{{.ID}}' | xargs docker stop
docker run -d -p $2:$3 "$1"
