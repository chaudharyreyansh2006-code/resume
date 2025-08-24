# Get Webhook Headers

> Get the headers for a specific webhook.

## OpenAPI

````yaml get /webhooks/{webhook_id}/headers
paths:
  path: /webhooks/{webhook_id}/headers
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

          const header = await client.webhooks.headers.retrieve('webhook_id');

          console.log(header.headers);
      - lang: Python
        source: |-
          from dodopayments import DodoPayments

          client = DodoPayments(
              bearer_token="My Bearer Token",
          )
          header = client.webhooks.headers.retrieve(
              "webhook_id",
          )
          print(header.headers)
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
            header, err := client.Webhooks.Headers.Get(context.TODO(), "webhook_id")
            if err != nil {
              panic(err.Error())
            }
            fmt.Printf("%+v\n", header.Headers)
          }
      - lang: Ruby
        source: |-
          require "dodopayments"

          dodo_payments = Dodopayments::Client.new(
            bearer_token: "My Bearer Token",
            environment: "test_mode" # defaults to "live_mode"
          )

          header = dodo_payments.webhooks.headers.retrieve("webhook_id")

          puts(header)
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              headers:
                allOf:
                  - type: object
                    description: List of headers configured
                    additionalProperties:
                      type: string
                    propertyNames:
                      type: string
              sensitive:
                allOf:
                  - type: array
                    items:
                      type: string
                    description: Sensitive headers without the value
            description: >-
              The value of the headers is returned in the `headers` field.


              Sensitive headers that have been redacted are returned in the
              sensitive

              field.
            refIdentifier: '#/components/schemas/GetWebhookHeadersResponse'
            requiredProperties:
              - headers
              - sensitive
        examples:
          example:
            value:
              headers: {}
              sensitive:
                - <string>
        description: Webhook headers details retrived.
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