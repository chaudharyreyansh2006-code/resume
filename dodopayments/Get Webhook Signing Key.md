# Get Webhook Signing Key

> Get the signing key for a specific webhook.

## OpenAPI

````yaml get /webhooks/{webhook_id}/secret
paths:
  path: /webhooks/{webhook_id}/secret
  method: get
  servers:
    - url: https://test.dodopayments.com/
      description: Test Mode Server Host
    - url: https://live.dodopayments.com/
      description: Live Mode Server Host
  request:
    security:
      - title: API KEY
        parameters:
          query: {}
          header:
            Authorization:
              type: http
              scheme: bearer
          cookie: {}
    parameters:
      path:
        webhook_id:
          schema:
            - type: string
              required: true
      query: {}
      header: {}
      cookie: {}
    body: {}
    codeSamples:
      - lang: JavaScript
        source: |-
          import DodoPayments from 'dodopayments';

          const client = new DodoPayments({
            bearerToken: 'My Bearer Token',
          });

          const response = await client.webhooks.retrieveSecret('webhook_id');

          console.log(response.secret);
      - lang: Python
        source: |-
          from dodopayments import DodoPayments

          client = DodoPayments(
              bearer_token="My Bearer Token",
          )
          response = client.webhooks.retrieve_secret(
              "webhook_id",
          )
          print(response.secret)
      - lang: Go
        source: |
          package main

          import (
            "context"
            "fmt"

            "github.com/dodopayments/dodopayments-go"
            "github.com/dodopayments/dodopayments-go/option"
          )

          func main() {
            client := dodopayments.NewClient(
              option.WithBearerToken("My Bearer Token"),
            )
            response, err := client.Webhooks.GetSecret(context.TODO(), "webhook_id")
            if err != nil {
              panic(err.Error())
            }
            fmt.Printf("%+v\n", response.Secret)
          }
      - lang: Ruby
        source: |-
          require "dodopayments"

          dodo_payments = Dodopayments::Client.new(
            bearer_token: "My Bearer Token",
            environment: "test_mode" # defaults to "live_mode"
          )

          response = dodo_payments.webhooks.retrieve_secret("webhook_id")

          puts(response)
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              secret:
                allOf:
                  - type: string
            refIdentifier: '#/components/schemas/GetWebhookSecretResponse'
            requiredProperties:
              - secret
        examples:
          example:
            value:
              secret: <string>
        description: Webhook secret retrived.
    '404':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Endpoint Not Found
        examples: {}
        description: Endpoint Not Found
    '500':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Something went wrong.
        examples: {}
        description: Something went wrong.
  deprecated: false
  type: path
components:
  schemas: {}

````