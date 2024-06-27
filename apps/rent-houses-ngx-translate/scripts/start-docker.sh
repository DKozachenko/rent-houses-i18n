image_name=rent-houses-ngx-translate-image;
container_name=rent-houses-ngx-translate-cont;

docker stop $container_name
docker rm $container_name
docker build . -t $image_name  -f Dockerfile.local
docker run -d -p 4200:80 --name $container_name $image_name:latest
