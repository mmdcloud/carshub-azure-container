# Container App with ACR Image
resource "azurerm_container_app" "container_app" {
  name                         = var.app_name
  container_app_environment_id = var.app_env_id
  resource_group_name          = var.rg
  revision_mode                = var.revision_mode
  ingress {
    target_port      = var.target_port
    external_enabled = var.external_enabled
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }
  identity {
    type = var.identity_type
    identity_ids = var.identity_ids
  }
  template {
    container {
      name   = var.container_name
      image  = var.image_uri
      cpu    = var.cpu
      memory = var.memory
      dynamic "env" {
        for_each = var.env
        content {
          name        = env.value["name"]
          value       = env.value["value"]
          secret_name = env.value["secret"]
        }
      }
    }
  }

  # ACR Authentication
  registry {
    server               = var.login_server
    username             = var.admin_username
    password_secret_name = "registry-credentials"
  }
  secret {
    name  = "registry-credentials"
    value = var.admin_password
  }
}
