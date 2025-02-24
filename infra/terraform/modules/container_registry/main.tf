# Container Registry
resource "azurerm_container_registry" "registry" {
  name                = var.name
  resource_group_name = var.rg
  location            = var.location
  sku                 = var.sku
  admin_enabled       = var.admin_enabled
}
