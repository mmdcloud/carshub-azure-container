# Function App
resource "azurerm_linux_function_app" "function" {
  name                       = var.name
  resource_group_name        = var.rg
  location                   = var.location
  service_plan_id            = var.service_plan_id
  storage_account_name       = var.storage_account_name
  storage_account_access_key = var.storage_account_access_key

  site_config {
    application_stack {
      python_version = var.python_version
    }
    cors {
      # allowed_origins = ["https://portal.azure.com"]
    }
  }

  app_settings = var.app_settings
  
  identity {
    identity_ids = var.identity_ids
    type         = var.identity_type
  }
}

resource "azurerm_function_app_function" "function_app_manage" {
  name            = "function_app_manage"
  function_app_id = azurerm_linux_function_app.function.id
  config_json = jsonencode({
    "bindings" = [
      {
        "authLevel" = "function"
        "direction" = "in"
        "methods" = [
          "get",
          "post"
        ]
        "name" = "req"
        "type" = "httpTrigger"
      },
      {
        "direction" = "out"
        "name"      = "$return"
        "type"      = "http"
      }
    ]
  })
}
