output "backend_url" {
  value = azurerm_public_ip.carshub_backend_agw_public_ip.fqdn
}
output "frontend_url" {
  value = azurerm_public_ip.carshub_frontend_agw_public_ip.fqdn
}
