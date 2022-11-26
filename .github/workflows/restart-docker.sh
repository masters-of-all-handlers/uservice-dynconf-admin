# перезапуск контейнера
# $1 - имя образа
# $2 - исходный порт
# $3 - порт контейнера
docker pull "$1"
cd ~/uservice-dynconf-deploy/
docker-compose up --build -d --force-recreate webapp
