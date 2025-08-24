# List Webhooks

> List all webhooks for a business.

## OpenAPI

````yaml get /webhooks
paths:
  path: /webhooks
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
      path: {}
      query:
        limit:
          schema:
            - type: integer
              required: false
              description: Limit the number of returned items
            - type: 'null'
              required: false
              description: Limit the number of returned items
        iterator:
          schema:
            - type: string
              required: false
              description: The iterator returned from a prior invocation
            - type: 'null'
              required: false
              description: The iterator returned from a prior invocation
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

          // Automatically fetches more pages as needed.
          for await (const webhookDetails of client.webhooks.list()) {
            console.log(webhookDetails.id);
          }
      - lang: Python
        source: |-
          from dodopayments import DodoPayments

          client = DodoPayments(
              bearer_token="My Bearer Token",
          )
          page = client.webhooks.list()
          page = page.data[0]
          print(page.id)
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
            page, err := client.Webhooks.List(context.TODO(), dodopayments.WebhookListParams{

            })
            if err != nil {
              panic(err.Error())
            }
            fmt.Printf("%+v\n", page)
          }
      - lang: Ruby
        source: |-
          require "dodopayments"

          dodo_payments = Dodopayments::Client.new(
            bearer_token: "My Bearer Token",
            environment: "test_mode" # defaults to "live_mode"
          )

          page = dodo_payments.webhooks.list

          puts(page)
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              data:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/WebhookDetails'
                    description: List of webhoooks
              done:
                allOf:
                  - type: boolean
                    description: true if no more values are to be fetched.
              iterator:
                allOf:
                  - type:
                      - string
                      - 'null'
                    description: Cursor pointing to the next paginated object
              prev_iterator:
                allOf:
                  - type:
                      - string
                      - 'null'
                    description: Cursor pointing to the previous paginated object
            refIdentifier: '#/components/schemas/ListWebhooksResponse'
            requiredProperties:
              - data
              - done
        examples:
          example:
            value:
              data:
                - created_at: <string>
                  description: <string>
                  disabled: true
                  filter_types:
                    - <string>
                  id: <string>
                  metadata: {}
                  rate_limit: 1
                  updated_at: <string>
                  url: <string>
              done: true
              iterator: <string>
              prev_iterator: <string>
        description: List of endpoints
  deprecated: false
  type: path
components:
  schemas:
    WebhookDetails:
      type: object
      required:
        - description
        - id
        - metadata
        - created_at
        - updated_at
        - url
      properties:
        created_at:
          type: string
          description: Created at timestamp
        description:
          type: string
          description: An example webhook name.
        disabled:
          type:
            - boolean
            - 'null'
          description: |-
            Status of the webhook.

            If true, events are not sent
        filter_types:
          type:
            - array
            - 'null'
          items:
            type: string
          description: |-
            Filter events to the webhook.

            Webhook event will only be sent for events in the list.
        id:
          type: string
          description: The webhook's ID.
        metadata:
          type: object
          description: Metadata of the webhook
          additionalProperties:
            type: string
          propertyNames:
            type: string
        rate_limit:
          type:
            - integer
            - 'null'
          format: int32
          description: Configured rate limit
          minimum: 0
        updated_at:
          type: string
          description: Updated at timestamp
        url:
          type: string
          description: Url endpoint of the webhook

````