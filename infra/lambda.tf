data "archive_file" "myasset-service" {
  for_each = local.lambdas

  output_path = "files/${each.key}-myasset-artefact.zip"
  type        = "zip"
  source_dfile = "${local.lambdas_path}/todos/${each.key}.js"
}

resource "aws_lambda_function" "todos" {
  for_each = local.lambdas

  function_name = "dynamodb-${each.key}-item"
  handler       = "${each.key}.handler"
  description   = each.value["description"]
  role          = aws_iam_role.rest_api_role.arn
  runtime       = "nodejs14.x"

  filename         = data.archive_file.todos[each.key].output_path
  source_code_hash = data.archive_file.todos[each.key].output_base64sha256

  timeout     = each.value["timeout"]
  memory_size = each.value["memory"]

  layers = [aws_lambda_layer_version.utils.arn]

  tracing_config {
    mode = "Active"
  }

  environment {
    variables = {
      TABLE = aws_ssm_parameter.dynamodb_table.name
      DEBUG = var.env == "dev"
    }
  }
}

resource "aws_lambda_permission" "api" {
  for_each = local.lambdas

  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.todos[each.key].arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.aws_region}:${var.aws_account_id}:*/*"
}