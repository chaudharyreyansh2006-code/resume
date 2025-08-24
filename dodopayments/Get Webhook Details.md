# Get Webhook Details

> Get detailed information about a specific webhook.

## OpenAPI

````yaml get /webhooks/{webhook_id}
paths:
  path: /webhooks/{webhook_id}
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

          const webhookDetails = await client.webhooks.retrieve('webhook_id');

          console.log(webhookDetails.id);
      - lang: Python
        source: |-
          from dodopayments import DodoPayments

          client = DodoPayments(
              bearer_token="My Bearer Token",
          )
          webhook_details = client.webhooks.retrieve(
              "webhook_id",
          )
          print(webhook_details.id)
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
            webhookDetails, err := client.Webhooks.Get(context.TODO(), "webhook_id")
            if err != nil {
              panic(err.Error())
            }
            fmt.Printf("%+v\n", webhookDetails.ID)
          }
      - lang: Ruby
        source: |-
          require "dodopayments"

          dodo_payments = Dodopayments::Client.new(
            bearer_token: "My Bearer Token",
            environment: "test_mode" # defaults to "live_mode"
          )

          webhook_details = dodo_payments.webhooks.retrieve("webhook_id")

          puts(webhook_details)
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              created_at:
                allOf:
                  - type: string
                    description: Created at timestamp
              description:
                allOf:
                  - type: string
                    description: An example webhook name.
              disabled:
                allOf:
                  - type:
                      - boolean
                      - 'null'
                    description: |-
                      Status of the webhook.

                      If true, events are not sent
              filter_types:
                allOf:
                  - type:
                      - array
                      - 'null'
                    items:
                      type: string
                    description: |-
                      Filter events to the webhook.

                      Webhook event will only be sent for events in the list.
              id:
                allOf:
                  - type: string
                    description: The webhook's ID.
              metadata:
                allOf:
                  - type: object
                    description: Metadata of the webhook
                    additionalProperties:
                      type: string
                    propertyNames:
                      type: string
              rate_limit:
                allOf:
                  - type:
                      - integer
                      - 'null'
                    format: int32
                    description: Configured rate limit
                    minimum: 0
              updated_at:
                allOf:
                  - type: string
                    description: Updated at timestamp
              url:
                allOf:
                  - type: string
                    description: Url endpoint of the webhook
            refIdentifier: '#/components/schemas/WebhookDetails'
            requiredProperties:
              - description
              - id
              - metadata
              - created_at
              - updated_at
              - url
        examples:
          example:
            value:
              created_at: <string>
              description: <string>
              disabled: true
              filter_types:
                - <string>
              id: <string>
              metadata: {}
              rate_limit: 1
              updated_at: <string>
              url: <string>
        description: Webhook details retrived.
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