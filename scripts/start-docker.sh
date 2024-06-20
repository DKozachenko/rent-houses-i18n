docker build . -t rent-houses-i18n-image  -f Dockerfile.local
docker run -d -p 4200:80 rent-houses-i18n-image:latest
