# Registering vault provider
data "vault_generic_secret" "sql" {
  path = "secret/sql"
}

# Creating a resource group
module "carshub_rg" {
  source   = "./modules/resource_groups"
  name     = "carshub_rg"
  location = var.location
}

# Key Vault for storing secrets
module "carshub_key_vault" {
  source = "./modules/key_vault"
  key_permissions = [
    "Create",
    "Get"
  ]
  secret_permissions = [
    "Set",
    "Get",
    "Delete",
    "Purge",
    "Recover"
  ]
  location                   = var.location
  rg                         = module.carshub_rg.name
  soft_delete_retention_days = 7
  sku_name                   = "premium"
  vault_name                 = "carshub"
  secrets = [
    {
      name  = "carshub-db-password"
      value = "Mohitdixit12345!"
    }
  ]
}

# Creating carshub database ( MySQL )
module "carshub_db" {
  source         = "./modules/database"
  admin_password = module.carshub_key_vault.secrets[0].value
  admin_username = "mohit"
  charset        = "utf8"
  db_name        = "carshub"
  server_name    = "carshub"
  location       = var.location
  rg             = module.carshub_rg.name
  collation      = "utf8_unicode_ci"
  sku            = "B_Standard_B1s"
}

# Carshub container registry 
module "carshub_container_registry" {
  source        = "./modules/container_registry"
  name          = "carshubweb"
  rg            = module.carshub_rg.name
  location      = var.location
  sku           = "Standard"
  admin_enabled = true
}

# Push frontend artifact to container registry
resource "null_resource" "push_frontend" {
  provisioner "local-exec" {
    command = "bash ../../frontend/artifact_push.sh https://${module.carshub_backend_app.url}"
  }
  depends_on = [module.carshub_container_registry]
}

# Push backend artifact to container registry
resource "null_resource" "push_backend" {
  provisioner "local-exec" {
    command = "bash ../../backend/api/artifact_push.sh"
  }
  depends_on = [module.carshub_container_registry]
}

# Creating a container app env
module "carshub_app_env" {
  source   = "./modules/container_app/container_app_env"
  name     = "carshub-app-env"
  rg       = module.carshub_rg.name
  location = var.location
}

# CarsHub frontend container app
module "carshub_frontend_app" {
  source         = "./modules/container_app"
  image_uri      = "${module.carshub_container_registry.login_server}/carshub-frontend/carshub-frontend:latest"
  app_name       = "carshub-frontend"
  container_name = "carshub-frontend"
  rg             = module.carshub_rg.name
  memory         = "1Gi"
  cpu            = 0.5
  app_env_id     = module.carshub_app_env.app_env_id
  revision_mode  = "Single"
  target_port    = 3000
  env = [
    {
      name   = "END_URL"
      value  = "https://${module.carshub_backend_app.url}"
      secret = null
    }
  ]
  external_enabled = true
  login_server     = module.carshub_container_registry.login_server
  admin_username   = module.carshub_container_registry.admin_username
  admin_password   = module.carshub_container_registry.admin_password
  depends_on       = [null_resource.push_frontend]
}

# CarsHub backend container app
module "carshub_backend_app" {
  source         = "./modules/container_app"
  image_uri      = "${module.carshub_container_registry.login_server}/carshub-backend/carshub-backend:latest"
  app_name       = "carshub-backend"
  container_name = "carshub-backend"
  rg             = module.carshub_rg.name
  memory         = "1Gi"
  cpu            = 0.5
  app_env_id     = module.carshub_app_env.app_env_id
  revision_mode  = "Single"
  env = [
    {
      name   = "DB_PATH"
      value  = "${module.carshub_db.fqdn}"
      secret = null
    },
    {
      name   = "UN"
      value  = "mohit"
      secret = null
    },
    {
      name   = "CREDS"
      value  = module.carshub_key_vault.secrets[0].value
      secret = null
    }
  ]
  target_port      = 3000
  external_enabled = true
  login_server     = module.carshub_container_registry.login_server
  admin_username   = module.carshub_container_registry.admin_username
  admin_password   = module.carshub_container_registry.admin_password
  depends_on       = [null_resource.push_backend]
}

# # Storage
module "carshub_storage" {
  source                   = "./modules/storage"
  name                     = "carshubstorage"
  rg                       = module.carshub_rg.name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  containers = [
    {
      name                  = "media"
      container_access_type = "private"
    }
  ]
}

# App Service Plan
module "carshub_app_service_plan" {
  source   = "./modules/app_service_plan"
  name     = "carshub-app-service-plan"
  location = var.location
  rg       = module.carshub_rg.name
  sku      = "Y1"
  os_type  = "Linux"
}

# Function app for updating storage metadata
module "carshub_media_update_function" {
  source                     = "./modules/function_app"
  name                       = "carsub-media-update"
  service_plan_id            = module.carshub_app_service_plan.service_plan_id
  storage_account_name       = module.carshub_storage.storage_account_name
  storage_account_access_key = module.carshub_storage.storage_account_access_key
  location                   = var.location
  rg                         = module.carshub_rg.name
  identity_type              = "SystemAssigned"
  identity_ids               = []
  app_settings = {
    FUNCTIONS_WORKER_RUNTIME        = "python"
    PYTHON_ENABLE_WORKER_EXTENSIONS = "1"
    AZURE_FUNCTIONS_ENVIRONMENT     = "Production"
    FUNCTIONS_EXTENSION_VERSION     = "~4"
    SCM_DO_BUILD_DURING_DEPLOYMENT  = "true"
    ENABLE_ORYX_BUILD               = "true"
  }
  python_version = "3.12"
}

# # Deploying function app to Azure
# resource "null_resource" "deploy_media_update_function" {
#   provisioner "local-exec" {
#     command = "bash ../../frontend/artifact_push.sh https://${module.carshub_backend_app.url}"
#   }
#   depends_on = [module.carshub_container_registry]
# }
