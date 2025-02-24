variable "app_name" {}
variable "app_env_id" {}
variable "rg" {}
variable "revision_mode" {}
variable "container_name" {}
variable "image_uri" {}
variable "cpu" {}
variable "memory" {}
variable "target_port" {}
variable "external_enabled" {}
variable "login_server" {}
variable "admin_password" {}
variable "admin_username" {}
# variable "identity" {}
variable "env" {
    type = list(object({
      name = string
      value = string
      secret = string
    }))
}
