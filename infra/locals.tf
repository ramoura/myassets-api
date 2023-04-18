locals {
  namespaced_service_name = "${var.service_name}-${var.env}"

  lambdas_path = "${path.module}/../lambdas"

  lambdas = {
    get_portfolio_current = {
      description = "Get Portfolio Current"
      memory      = 256
      timeout     = 10
    }
    post_import_portfolio = {
      description = "Post Import Portfolio"
      memory      = 256
      timeout     = 10
    }
  }
}
