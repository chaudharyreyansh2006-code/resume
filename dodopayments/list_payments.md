# List Payments

> Get a list of all payments associated with your account.

## OpenAPI

````yaml get /payments
paths:
  path: /payments
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
        created_at_gte:
          schema:
            - type: string
              required: false
              description: Get events after this created time
              format: date-time
          style: form
        created_at_lte:
          schema:
            - type: string
              required: false
              description: Get events created before this time
              format: date-time
          style: form
        page_size:
          schema:
            - type: integer
              required: false
              description: Page size default is 10 max is 100
              minimum: 0
          style: form
        page_number:
          schema:
            - type: integer
              required: false
              description: Page number default is 0
              minimum: 0
          style: form
        customer_id:
          schema:
            - type: string
              required: false
              description: Filter by customer id
          style: form
        subscription_id:
          schema:
            - type: string
              required: false
              description: Filter by subscription id
          style: form
        status:
          schema:
            - type: enum<string>
              enum:
                - succeeded
                - failed
                - cancelled
                - processing
                - requires_customer_action
                - requires_merchant_action
                - requires_payment_method
                - requires_confirmation
                - requires_capture
                - partially_captured
                - partially_captured_and_capturable
              required: false
              description: Filter by status
          style: form
        brand_id:
          schema:
            - type: string
              required: false
              description: filter by Brand id
          style: form
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
          for await (const paymentListResponse of client.payments.list()) {
            console.log(paymentListResponse.brand_id);
          }
      - lang: Python
        source: |-
          from dodopayments import DodoPayments

          client = DodoPayments(
              bearer_token="My Bearer Token",
          )
          page = client.payments.list()
          page = page.items[0]
          print(page.brand_id)
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
            page, err := client.Payments.List(context.TODO(), dodopayments.PaymentListParams{

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

          page = dodo_payments.payments.list

          puts(page)
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              items:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/GetPaymentsListResponseItem'
            refIdentifier: '#/components/schemas/GetPaymentsListResponse'
            requiredProperties:
              - items
        examples:
          example:
            value:
              items:
                - brand_id: <string>
                  created_at: '2023-11-07T05:31:56Z'
                  currency: AED
                  customer:
                    customer_id: <string>
                    email: <string>
                    name: <string>
                  digital_products_delivered: true
                  metadata: {}
                  payment_id: <string>
                  payment_method: <string>
                  payment_method_type: <string>
                  status: null
                  subscription_id: <string>
                  total_amount: 123
        description: ''
    '500':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Something went wrong :(
        examples: {}
        description: Something went wrong :(
  deprecated: false
  type: path
components:
  schemas:
    Currency:
      type: string
      enum:
        - AED
        - ALL
        - AMD
        - ANG
        - AOA
        - ARS
        - AUD
        - AWG
        - AZN
        - BAM
        - BBD
        - BDT
        - BGN
        - BHD
        - BIF
        - BMD
        - BND
        - BOB
        - BRL
        - BSD
        - BWP
        - BYN
        - BZD
        - CAD
        - CHF
        - CLP
        - CNY
        - COP
        - CRC
        - CUP
        - CVE
        - CZK
        - DJF
        - DKK
        - DOP
        - DZD
        - EGP
        - ETB
        - EUR
        - FJD
        - FKP
        - GBP
        - GEL
        - GHS
        - GIP
        - GMD
        - GNF
        - GTQ
        - GYD
        - HKD
        - HNL
        - HRK
        - HTG
        - HUF
        - IDR
        - ILS
        - INR
        - IQD
        - JMD
        - JOD
        - JPY
        - KES
        - KGS
        - KHR
        - KMF
        - KRW
        - KWD
        - KYD
        - KZT
        - LAK
        - LBP
        - LKR
        - LRD
        - LSL
        - LYD
        - MAD
        - MDL
        - MGA
        - MKD
        - MMK
        - MNT
        - MOP
        - MRU
        - MUR
        - MVR
        - MWK
        - MXN
        - MYR
        - MZN
        - NAD
        - NGN
        - NIO
        - NOK
        - NPR
        - NZD
        - OMR
        - PAB
        - PEN
        - PGK
        - PHP
        - PKR
        - PLN
        - PYG
        - QAR
        - RON
        - RSD
        - RUB
        - RWF
        - SAR
        - SBD
        - SCR
        - SEK
        - SGD
        - SHP
        - SLE
        - SLL
        - SOS
        - SRD
        - SSP
        - STN
        - SVC
        - SZL
        - THB
        - TND
        - TOP
        - TRY
        - TTD
        - TWD
        - TZS
        - UAH
        - UGX
        - USD
        - UYU
        - UZS
        - VES
        - VND
        - VUV
        - WST
        - XAF
        - XCD
        - XOF
        - XPF
        - YER
        - ZAR
        - ZMW
    CustomerLimitedDetailsResponse:
      type: object
      required:
        - customer_id
        - name
        - email
      properties:
        customer_id:
          type: string
          description: Unique identifier for the customer
        email:
          type: string
          description: Email address of the customer
        name:
          type: string
          description: Full name of the customer
    GetPaymentsListResponseItem:
      type: object
      required:
        - payment_id
        - total_amount
        - currency
        - customer
        - created_at
        - brand_id
        - digital_products_delivered
        - metadata
      properties:
        brand_id:
          type: string
        created_at:
          type: string
          format: date-time
        currency:
          $ref: '#/components/schemas/Currency'
        customer:
          $ref: '#/components/schemas/CustomerLimitedDetailsResponse'
        digital_products_delivered:
          type: boolean
        metadata:
          $ref: '#/components/schemas/Metadata'
        payment_id:
          type: string
        payment_method:
          type:
            - string
            - 'null'
        payment_method_type:
          type:
            - string
            - 'null'
        status:
          oneOf:
            - type: 'null'
            - $ref: '#/components/schemas/IntentStatus'
        subscription_id:
          type:
            - string
            - 'null'
        total_amount:
          type: integer
          format: int32
    IntentStatus:
      type: string
      enum:
        - succeeded
        - failed
        - cancelled
        - processing
        - requires_customer_action
        - requires_merchant_action
        - requires_payment_method
        - requires_confirmation
        - requires_capture
        - partially_captured
        - partially_captured_and_capturable
    Metadata:
      type: object
      additionalProperties:
        type: string
      propertyNames:
        type: string

````