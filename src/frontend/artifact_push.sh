#!/bin/bash
mkdir frontend-code
cp -r ../../../frontend/* frontend-code/
cd frontend-code

az acr login --name myacr

docker buildx build --tag carshub-frontend --file ./Dockerfile .
docker tag carshub-frontend:latest $1.azurecr.io/carshub-frontend/carshub-frontend:latest
docker push $1.azurecr.io/carshub-frontend/carshub-frontend:latest