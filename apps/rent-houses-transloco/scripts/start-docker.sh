image_name=rent-houses-transloco-image;
container_name=rent-houses-transloco-cont;

docker stop $container_name
docker rm $container_name
docker build . -t $image_name  -f Dockerfile.local
docker run -d -p 4200:80 --name $container_name $image_name:latest
