#!/bin/bash
mkdir frontend-code
cp -r ../../frontend/* frontend-code/
cd frontend-code
az acr login --name carshubweb

cat > .env << EOL
END_URL=$1
CDN_URL=""
EOL

docker buildx build --tag carshub-frontend --file Dockerfile .
docker tag carshub-frontend:latest carshubweb.azurecr.io/carshub-frontend/carshub-frontend:latest
docker push carshubweb.azurecr.io/carshub-frontend/carshub-frontend:latest