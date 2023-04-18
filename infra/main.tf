terraform {
  required_version = ">= 1.0.5"
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile

  default_tags {
    tags = {
      Project   = "Serverless REST API"
      CreatedAt = "2023-04-11"
      ManagedBy = "Terraform"
      Owner     = "Renato Moura"
      Env       = var.env
    }
  }
}
