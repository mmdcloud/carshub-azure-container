# FrontDoor profile
resource "azurerm_cdn_frontdoor_profile" "append_cdn_profile" {
  name                = "append-cdn-profile"
  resource_group_name = azurerm_resource_group.append_resource_group.name
  sku_name            = "Standard_AzureFrontDoor"
}

# Frontdoor Endpoint details
resource "azurerm_cdn_frontdoor_endpoint" "append_cdn_endpoint" {
  name                     = "append-cdn-endpoint"
  cdn_frontdoor_profile_id = azurerm_cdn_frontdoor_profile.append_cdn_profile.id
}

# Frontdoor origin group
resource "azurerm_cdn_frontdoor_origin_group" "append_cdn_origin_group" {
  name                     = "append-cdn-origin-group"
  cdn_frontdoor_profile_id = azurerm_cdn_frontdoor_profile.append_cdn_profile.id

  health_probe {
    interval_in_seconds = 100
    path                = "/index.html"
    protocol            = "Https"
    request_type        = "HEAD"
  }

  load_balancing {
    sample_size                 = 4
    successful_samples_required = 3
  }
}

# Frontdoor origin
resource "azurerm_cdn_frontdoor_origin" "append_cdn_origin" {
  name                           = "append-cdn-origin"
  cdn_frontdoor_origin_group_id  = azurerm_cdn_frontdoor_origin_group.append_cdn_origin_group.id
  enabled                        = true
  certificate_name_check_enabled = false
  host_name                      = azurerm_storage_account.append_storage_account.primary_web_host
  origin_host_header             = azurerm_storage_account.append_storage_account.primary_web_host
}

# Frontdoor route
resource "azurerm_cdn_frontdoor_route" "append_cdn_route" {
  name                          = "append-cdn-route"
  cdn_frontdoor_endpoint_id     = azurerm_cdn_frontdoor_endpoint.append_cdn_endpoint.id
  cdn_frontdoor_origin_group_id = azurerm_cdn_frontdoor_origin_group.append_cdn_origin_group.id
  cdn_frontdoor_origin_ids      = [azurerm_cdn_frontdoor_origin.append_cdn_origin.id]

  patterns_to_match   = ["/*"]
  forwarding_protocol = "HttpsOnly"
  supported_protocols = ["Https", "Http"]

  cache {
    query_string_caching_behavior = "IgnoreQueryString"
    compression_enabled           = true
    content_types_to_compress     = ["text/html", "text/css", "application/javascript", "application/json"]
  }
}
