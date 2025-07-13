#!/bin/bash
mkdir backend-code
cp -r ../../../backend/api/* backend-code/
cd backend-code

az acr login --name myacr

docker buildx build --tag carshub-backend --file ./Dockerfile .
docker tag carshub-backend:latest $1.azurecr.io/carshub-backend/carshub-backend:latest
docker push $1.azurecr.io/carshub-backend/carshub-backend:latest