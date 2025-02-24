# Container App Environment
resource "azurerm_container_app_environment" "carshub_app_env" {
  name                = var.name
  location            = var.location
  resource_group_name = var.rg
}
