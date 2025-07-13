#!/bin/bash
set -e

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORK_DIR="$(mktemp -d)"

# Copy frontend source to temp directory
cp -r "$SCRIPT_DIR"/* "$WORK_DIR/"
cd "$WORK_DIR"

# Create environment file
cat > .env << EOL
BASE_URL=$2
CDN_URL=$2
EOL

# Login to Azure Container Registry
az acr login --name $1

# Build and push Docker image
docker buildx build --tag carshub-frontend --file ./Dockerfile .
docker tag carshub-frontend:latest $1/carshub-frontend/carshub-frontend:latest
docker push $1/carshub-frontend/carshub-frontend:latest

# Cleanup
rm -rf "$WORK_DIR"