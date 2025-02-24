#!/bin/bash
mkdir code
cp -r ../../backend/api/* code/
cd code
az acr login --name carshubweb
docker buildx build --tag carshub-backend --file Dockerfile .
docker tag carshub-backend:latest carshubweb.azurecr.io/carshub-backend/carshub-backend:latest
docker push carshubweb.azurecr.io/carshub-backend/carshub-backend:latest