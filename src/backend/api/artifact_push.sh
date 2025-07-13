#!/bin/bash
set -e

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORK_DIR="$(mktemp -d)"

# Copy backend source to temp directory
cp -r "$SCRIPT_DIR"/* "$WORK_DIR/"
cd "$WORK_DIR"

# Login to Azure Container Registry
az acr login --name $1

# Build and push Docker image
docker buildx build --tag carshub-backend --file ./Dockerfile .
docker tag carshub-backend:latest $1/carshub-backend/carshub-backend:latest
docker push $1/carshub-backend/carshub-backend:latest

# Cleanup
rm -rf "$WORK_DIR"