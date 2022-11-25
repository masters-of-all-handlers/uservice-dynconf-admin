# перезапуск контейнера
# $1 - имя образа
# $2 - строка с портом (80:80, например)
docker pull "$1"
docker ps -f "ancestor=$1" --format '{{.ID}}' | xargs docker stop
docker run -d -p $2 "$1"
