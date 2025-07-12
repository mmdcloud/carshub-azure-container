# Registering vault provider
data "vault_generic_secret" "sql" {
  path = "secret/sql"
}

# Creating a resource group
module "carshub_rg" {
  source   = "./modules/resource_group"
  name     = "carshub-rg"
  location = var.location
}

# Virtual network
module "carshub_vnet" {
  source              = "./modules/vnet"
  name                = "carshub-vnet"
  address_space       = ["10.0.0.0/16"]
  resource_group_name = module.carshub_rg.name
  location            = module.carshub_rg.location
  subnets = [
    {
      name           = "public subnet 1"
      address_prefix = ["10.0.1.0/24"]
    },
    {
      name           = "public subnet 2"
      address_prefix = ["10.0.2.0/24"]
    },
    {
      name           = "public subnet 3"
      address_prefix = ["10.0.3.0/24"]
    },
    {
      name           = "private subnet 1"
      address_prefix = ["10.0.4.0/24"]
    },
    {
      name           = "private subnet 2"
      address_prefix = ["10.0.5.0/24"]
    },
    {
      name           = "private subnet 3"
      address_prefix = ["10.0.6.0/24"]
    }
  ]
}

# Network security groups
resource "azurerm_network_security_group" "carshub_frontend_agw_nsg" {
  name                = "carshub-frontend-agw-nsg"
  resource_group_name = module.carshub_rg.name
  location            = module.carshub_rg.location

  security_rule {
    name                       = "AllowHTTP"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "AllowHTTPS"
    priority                   = 110
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "443"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

resource "azurerm_network_security_group" "carshub_backend_agw_nsg" {
  name                = "carshub-backend-agw-nsg"
  resource_group_name = module.carshub_rg.name
  location            = module.carshub_rg.location

  security_rule {
    name                       = "AllowHTTP"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "AllowHTTPS"
    priority                   = 110
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "443"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

resource "azurerm_subnet_network_security_group_association" "agw" {
  subnet_id                 = module.carshub_vnet.subnets[0].id
  network_security_group_id = azurerm_network_security_group.carshub_frontend_agw_nsg.id
}

resource "azurerm_subnet_network_security_group_association" "agw" {
  subnet_id                 = module.carshub_vnet.subnets[1].id
  network_security_group_id = azurerm_network_security_group.carshub_backend_agw_nsg.id
}

# Public IP for Frontend Application Gateway
resource "azurerm_public_ip" "carshub_frontend_agw_public_ip" {
  name                = "carshub-frontend-agw-public-ip"
  resource_group_name = module.carshub_rg.name
  location            = module.carshub_rg.location
  allocation_method   = "Static"
  sku                 = "Standard"
  domain_name_label   = "prod-agw-${lower(substr(md5(azurerm_resource_group.agw.id), 0, 8))}"
}

# Public IP for Backend Application Gateway
resource "azurerm_public_ip" "carshub_backend_agw_public_ip" {
  name                = "carshub-backend-agw-public-ip"
  resource_group_name = module.carshub_rg.name
  location            = module.carshub_rg.location
  allocation_method   = "Static"
  sku                 = "Standard"
  domain_name_label   = "prod-agw-${lower(substr(md5(azurerm_resource_group.agw.id), 0, 8))}"
}

# Application gateway for frontend
resource "azurerm_application_gateway" "carshub_frontend_agw" {
  name                = "carshub-frontend-agw"
  resource_group_name = module.carshub_rg.name
  location            = module.carshub_rg.location

  sku {
    name     = "WAF_v2"
    tier     = "WAF_v2"
    capacity = 2
  }

  gateway_ip_configuration {
    name      = "carshub-frontend-agw-gw-ip-config"
    subnet_id = module.carshub_vnet.subnets[0].id
  }

  frontend_ip_configuration {
    name                 = "carshub-frontend-agw-ip"
    public_ip_address_id = azurerm_public_ip.carshub_frontend_agw_public_ip.id
  }

  frontend_port {
    name = "http"
    port = 80
  }

  frontend_port {
    name = "https"
    port = 443
  }

  backend_address_pool {
    name  = "carshub-frontend-container-app"
    fqdns = ["https://${module.carshub_frontend_app.url}"]
  }

  # Health probe
  probe {
    name                = "carshub-frontend-health-probe"
    protocol            = "Http"
    path                = "/auth/signin"
    interval            = 30
    timeout             = 30
    unhealthy_threshold = 3
    host                = "https://${module.carshub_frontend_app.url}"
  }

  backend_http_settings {
    name                  = "carshub-frontend-https-settings"
    cookie_based_affinity = "Disabled"
    port                  = 443
    protocol              = "Https"
    request_timeout       = 60
    probe_name            = "carshub-frontend-health-probe"
  }

  waf_configuration {
    enabled                  = true
    firewall_mode            = "Prevention"
    rule_set_type            = "OWASP"
    rule_set_version         = "3.2"
    request_body_check       = true
    max_request_body_size_kb = 128
    file_upload_limit_mb     = 100
  }

  ssl_certificate {
    name                = "wildcard-cert"
    key_vault_secret_id = azurerm_key_vault_certificate.wildcard.secret_id
  }

  http_listener {
    name                           = "carshub-frontend-https-listener"
    frontend_ip_configuration_name = "carshub-frontend-agw-ip"
    frontend_port_name             = "https"
    protocol                       = "Https"
    ssl_certificate_name           = "wildcard-cert"
  }

  request_routing_rule {
    name                       = "carshub-frontend-https-rule"
    rule_type                  = "Basic"
    http_listener_name         = "carshub-frontend-https-listener"
    backend_address_pool_name  = "carshub-frontend-container-app"
    backend_http_settings_name = "carshub-frontend-https-settings"
    priority                   = 100
  }

  autoscale_configuration {
    min_capacity = 2
    max_capacity = 10
  }

  zones = ["1", "2", "3"]

  depends_on = [azurerm_monitor_diagnostic_setting.agw]
}

# Application gateway for backend
resource "azurerm_application_gateway" "carshub_backend_agw" {
  name                = "carshub-backend-agw"
  resource_group_name = module.carshub_rg.name
  location            = module.carshub_rg.location

  sku {
    name     = "WAF_v2"
    tier     = "WAF_v2"
    capacity = 2
  }

  gateway_ip_configuration {
    name      = "carshub-backend-agw-gw-ip-config"
    subnet_id = module.carshub_vnet.subnets[1].id
  }

  frontend_ip_configuration {
    name                 = "carshub-backend-agw-ip"
    public_ip_address_id = azurerm_public_ip.carshub_backend_agw_public_ip.id
  }

  frontend_port {
    name = "http"
    port = 80
  }

  frontend_port {
    name = "https"
    port = 443
  }

  backend_address_pool {
    name  = "carshub-backend-container-app"
    fqdns = ["https://${module.carshub_backend_app.url}"]
  }

  probe {
    name                = "carshub-backend-health-probe"
    protocol            = "Http"
    path                = "/"
    interval            = 30
    timeout             = 30
    unhealthy_threshold = 3
    host                = "https://${module.carshub_backend_app.url}"
  }

  backend_http_settings {
    name                  = "carshub-backend-https-settings"
    cookie_based_affinity = "Disabled"
    port                  = 443
    protocol              = "Https"
    request_timeout       = 60
    probe_name            = "carshub-backend-health-probe"
  }

  waf_configuration {
    enabled                  = true
    firewall_mode            = "Prevention"
    rule_set_type            = "OWASP"
    rule_set_version         = "3.2"
    request_body_check       = true
    max_request_body_size_kb = 128
    file_upload_limit_mb     = 100
  }

  ssl_certificate {
    name                = "wildcard-cert"
    key_vault_secret_id = azurerm_key_vault_certificate.wildcard.secret_id
  }

  http_listener {
    name                           = "carshub-backend-https-listener"
    frontend_ip_configuration_name = "agw-frontend-ip"
    frontend_port_name             = "https"
    protocol                       = "Https"
    ssl_certificate_name           = "wildcard-cert"
  }

  request_routing_rule {
    name                       = "carshub-backend-https-rule"
    rule_type                  = "Basic"
    http_listener_name         = "carshub-backend-https-listener"
    backend_address_pool_name  = "carshub-backend-container-app"
    backend_http_settings_name = "carshub-backend-https-settings"
    priority                   = 100
  }

  autoscale_configuration {
    min_capacity = 2
    max_capacity = 10
  }

  zones = ["1", "2", "3"]

  depends_on = [azurerm_monitor_diagnostic_setting.agw]
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
      name  = tostring(data.vault_generic_secret.rds.data["username"])
      value = tostring(data.vault_generic_secret.rds.data["password"])
    }
  ]
}

# Creating carshub database ( MySQL )
module "carshub_db" {
  source         = "./modules/database"
  admin_username = tostring(data.vault_generic_secret.rds.data["username"])
  admin_password = tostring(data.vault_generic_secret.rds.data["password"])
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
