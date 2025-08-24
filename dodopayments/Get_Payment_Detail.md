# Get Payment Detail

> Get detailed information about a specific payment.

## OpenAPI

````yaml get /payments/{payment_id}
paths:
  path: /payments/{payment_id}
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
        payment_id:
          schema:
            - type: string
              required: true
              description: Payment Id
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

          const payment = await client.payments.retrieve('payment_id');

          console.log(payment.brand_id);
      - lang: Python
        source: |-
          from dodopayments import DodoPayments

          client = DodoPayments(
              bearer_token="My Bearer Token",
          )
          payment = client.payments.retrieve(
              "payment_id",
          )
          print(payment.brand_id)
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
            payment, err := client.Payments.Get(context.TODO(), "payment_id")
            if err != nil {
              panic(err.Error())
            }
            fmt.Printf("%+v\n", payment.BrandID)
          }
      - lang: Ruby
        source: |-
          require "dodopayments"

          dodo_payments = Dodopayments::Client.new(
            bearer_token: "My Bearer Token",
            environment: "test_mode" # defaults to "live_mode"
          )

          payment = dodo_payments.payments.retrieve("payment_id")

          puts(payment)
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              billing:
                allOf:
                  - $ref: '#/components/schemas/BillingAddress'
                    description: Billing address details for payments
              brand_id:
                allOf:
                  - type: string
                    description: brand id this payment belongs to
              business_id:
                allOf:
                  - type: string
                    description: Identifier of the business associated with the payment
              card_issuing_country:
                allOf:
                  - oneOf:
                      - type: 'null'
                      - $ref: '#/components/schemas/CountryCodeAlpha2'
                        description: ISO2 country code of the card
              card_last_four:
                allOf:
                  - type:
                      - string
                      - 'null'
                    description: The last four digits of the card
              card_network:
                allOf:
                  - type:
                      - string
                      - 'null'
                    description: Card network like VISA, MASTERCARD etc.
              card_type:
                allOf:
                  - type:
                      - string
                      - 'null'
                    description: The type of card DEBIT or CREDIT
              created_at:
                allOf:
                  - type: string
                    format: date-time
                    description: Timestamp when the payment was created
              currency:
                allOf:
                  - $ref: '#/components/schemas/Currency'
                    description: Currency used for the payment
              customer:
                allOf:
                  - $ref: '#/components/schemas/CustomerLimitedDetailsResponse'
                    description: Details about the customer who made the payment
              digital_products_delivered:
                allOf:
                  - type: boolean
                    description: brand id this payment belongs to
              discount_id:
                allOf:
                  - type:
                      - string
                      - 'null'
                    description: The discount id if discount is applied
              disputes:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/DisputeResponse'
                    description: List of disputes associated with this payment
              error_code:
                allOf:
                  - type:
                      - string
                      - 'null'
                    description: An error code if the payment failed
              error_message:
                allOf:
                  - type:
                      - string
                      - 'null'
                    description: An error message if the payment failed
              metadata:
                allOf:
                  - $ref: '#/components/schemas/Metadata'
                    description: Additional custom data associated with the payment
              payment_id:
                allOf:
                  - type: string
                    description: Unique identifier for the payment
              payment_link:
                allOf:
                  - type:
                      - string
                      - 'null'
                    description: Checkout URL
              payment_method:
                allOf:
                  - type:
                      - string
                      - 'null'
                    description: >-
                      Payment method used by customer (e.g. "card",
                      "bank_transfer")
              payment_method_type:
                allOf:
                  - type:
                      - string
                      - 'null'
                    description: >-
                      Specific type of payment method (e.g. "visa",
                      "mastercard")
              product_cart:
                allOf:
                  - type:
                      - array
                      - 'null'
                    items:
                      $ref: '#/components/schemas/OneTimeProductCartItemResponse'
                    description: List of products purchased in a one-time payment
              refunds:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/RefundResponse'
                    description: List of refunds issued for this payment
              settlement_amount:
                allOf:
                  - type: integer
                    format: int32
                    description: >-
                      The amount that will be credited to your Dodo balance
                      after currency conversion and processing.

                      Especially relevant for adaptive pricing where the
                      customer's payment currency differs from your settlement
                      currency.
              settlement_currency:
                allOf:
                  - $ref: '#/components/schemas/Currency'
                    description: >-
                      The currency in which the settlement_amount will be
                      credited to your Dodo balance.

                      This may differ from the customer's payment currency in
                      adaptive pricing scenarios.
              settlement_tax:
                allOf:
                  - type:
                      - integer
                      - 'null'
                    format: int32
                    description: >-
                      This represents the portion of settlement_amount that
                      corresponds to taxes collected.

                      Especially relevant for adaptive pricing where the tax
                      component must be tracked separately

                      in your Dodo balance.
              status:
                allOf:
                  - oneOf:
                      - type: 'null'
                      - $ref: '#/components/schemas/IntentStatus'
                        description: Current status of the payment intent
              subscription_id:
                allOf:
                  - type:
                      - string
                      - 'null'
                    description: >-
                      Identifier of the subscription if payment is part of a
                      subscription
              tax:
                allOf:
                  - type:
                      - integer
                      - 'null'
                    format: int32
                    description: >-
                      Amount of tax collected in smallest currency unit (e.g.
                      cents)
              total_amount:
                allOf:
                  - type: integer
                    format: int32
                    description: >-
                      Total amount charged to the customer including tax, in
                      smallest currency unit (e.g. cents)
              updated_at:
                allOf:
                  - type:
                      - string
                      - 'null'
                    format: date-time
                    description: Timestamp when the payment was last updated
            refIdentifier: '#/components/schemas/PaymentResponse'
            requiredProperties:
              - payment_id
              - business_id
              - total_amount
              - currency
              - created_at
              - disputes
              - refunds
              - customer
              - metadata
              - settlement_amount
              - settlement_currency
              - billing
              - brand_id
              - digital_products_delivered
        examples:
          example:
            value:
              billing:
                city: <string>
                country: AF
                state: <string>
                street: <string>
                zipcode: <string>
              brand_id: <string>
              business_id: <string>
              card_issuing_country: null
              card_last_four: <string>
              card_network: <string>
              card_type: <string>
              created_at: '2023-11-07T05:31:56Z'
              currency: AED
              customer:
                customer_id: <string>
                email: <string>
                name: <string>
              digital_products_delivered: true
              discount_id: <string>
              disputes:
                - amount: <string>
                  business_id: <string>
                  created_at: '2023-11-07T05:31:56Z'
                  currency: <string>
                  dispute_id: <string>
                  dispute_stage: pre_dispute
                  dispute_status: dispute_opened
                  payment_id: <string>
                  remarks: <string>
              error_code: <string>
              error_message: <string>
              metadata: {}
              payment_id: <string>
              payment_link: <string>
              payment_method: <string>
              payment_method_type: <string>
              product_cart:
                - product_id: <string>
                  quantity: 1
              refunds:
                - amount: 123
                  business_id: <string>
                  created_at: '2023-11-07T05:31:56Z'
                  currency: null
                  is_partial: true
                  payment_id: <string>
                  reason: <string>
                  refund_id: <string>
                  status: succeeded
              settlement_amount: 123
              settlement_currency: AED
              settlement_tax: 123
              status: null
              subscription_id: <string>
              tax: 123
              total_amount: 123
              updated_at: '2023-11-07T05:31:56Z'
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
    BillingAddress:
      type: object
      required:
        - country
        - state
        - city
        - street
        - zipcode
      properties:
        city:
          type: string
          description: City name
        country:
          $ref: '#/components/schemas/CountryCodeAlpha2'
          description: Two-letter ISO country code (ISO 3166-1 alpha-2)
        state:
          type: string
          description: State or province name
        street:
          type: string
          description: >-
            Street address including house number and unit/apartment if
            applicable
        zipcode:
          type: string
          description: Postal code or ZIP code
    CountryCodeAlpha2:
      type: string
      description: ISO country code alpha2 variant
      enum:
        - AF
        - AX
        - AL
        - DZ
        - AS
        - AD
        - AO
        - AI
        - AQ
        - AG
        - AR
        - AM
        - AW
        - AU
        - AT
        - AZ
        - BS
        - BH
        - BD
        - BB
        - BY
        - BE
        - BZ
        - BJ
        - BM
        - BT
        - BO
        - BQ
        - BA
        - BW
        - BV
        - BR
        - IO
        - BN
        - BG
        - BF
        - BI
        - KH
        - CM
        - CA
        - CV
        - KY
        - CF
        - TD
        - CL
        - CN
        - CX
        - CC
        - CO
        - KM
        - CG
        - CD
        - CK
        - CR
        - CI
        - HR
        - CU
        - CW
        - CY
        - CZ
        - DK
        - DJ
        - DM
        - DO
        - EC
        - EG
        - SV
        - GQ
        - ER
        - EE
        - ET
        - FK
        - FO
        - FJ
        - FI
        - FR
        - GF
        - PF
        - TF
        - GA
        - GM
        - GE
        - DE
        - GH
        - GI
        - GR
        - GL
        - GD
        - GP
        - GU
        - GT
        - GG
        - GN
        - GW
        - GY
        - HT
        - HM
        - VA
        - HN
        - HK
        - HU
        - IS
        - IN
        - ID
        - IR
        - IQ
        - IE
        - IM
        - IL
        - IT
        - JM
        - JP
        - JE
        - JO
        - KZ
        - KE
        - KI
        - KP
        - KR
        - KW
        - KG
        - LA
        - LV
        - LB
        - LS
        - LR
        - LY
        - LI
        - LT
        - LU
        - MO
        - MK
        - MG
        - MW
        - MY
        - MV
        - ML
        - MT
        - MH
        - MQ
        - MR
        - MU
        - YT
        - MX
        - FM
        - MD
        - MC
        - MN
        - ME
        - MS
        - MA
        - MZ
        - MM
        - NA
        - NR
        - NP
        - NL
        - NC
        - NZ
        - NI
        - NE
        - NG
        - NU
        - NF
        - MP
        - 'NO'
        - OM
        - PK
        - PW
        - PS
        - PA
        - PG
        - PY
        - PE
        - PH
        - PN
        - PL
        - PT
        - PR
        - QA
        - RE
        - RO
        - RU
        - RW
        - BL
        - SH
        - KN
        - LC
        - MF
        - PM
        - VC
        - WS
        - SM
        - ST
        - SA
        - SN
        - RS
        - SC
        - SL
        - SG
        - SX
        - SK
        - SI
        - SB
        - SO
        - ZA
        - GS
        - SS
        - ES
        - LK
        - SD
        - SR
        - SJ
        - SZ
        - SE
        - CH
        - SY
        - TW
        - TJ
        - TZ
        - TH
        - TL
        - TG
        - TK
        - TO
        - TT
        - TN
        - TR
        - TM
        - TC
        - TV
        - UG
        - UA
        - AE
        - GB
        - UM
        - US
        - UY
        - UZ
        - VU
        - VE
        - VN
        - VG
        - VI
        - WF
        - EH
        - YE
        - ZM
        - ZW
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
    DisputeResponse:
      type: object
      required:
        - dispute_id
        - payment_id
        - business_id
        - amount
        - currency
        - dispute_status
        - dispute_stage
        - created_at
      properties:
        amount:
          type: string
          description: >-
            The amount involved in the dispute, represented as a string to
            accommodate precision.
        business_id:
          type: string
          description: The unique identifier of the business involved in the dispute.
        created_at:
          type: string
          format: date-time
          description: The timestamp of when the dispute was created, in UTC.
        currency:
          type: string
          description: >-
            The currency of the disputed amount, represented as an ISO 4217
            currency code.
        dispute_id:
          type: string
          description: The unique identifier of the dispute.
        dispute_stage:
          $ref: '#/components/schemas/DisputeStage'
          description: The current stage of the dispute process.
        dispute_status:
          $ref: '#/components/schemas/DisputeStatus'
          description: The current status of the dispute.
        payment_id:
          type: string
          description: The unique identifier of the payment associated with the dispute.
        remarks:
          type:
            - string
            - 'null'
          description: Remarks
    DisputeStage:
      type: string
      enum:
        - pre_dispute
        - dispute
        - pre_arbitration
    DisputeStatus:
      type: string
      enum:
        - dispute_opened
        - dispute_expired
        - dispute_accepted
        - dispute_cancelled
        - dispute_challenged
        - dispute_won
        - dispute_lost
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
    OneTimeProductCartItemResponse:
      type: object
      required:
        - product_id
        - quantity
      properties:
        product_id:
          type: string
        quantity:
          type: integer
          format: int32
          minimum: 0
    RefundResponse:
      type: object
      required:
        - refund_id
        - payment_id
        - business_id
        - status
        - created_at
        - is_partial
      properties:
        amount:
          type:
            - integer
            - 'null'
          format: int32
          description: The refunded amount.
        business_id:
          type: string
          description: The unique identifier of the business issuing the refund.
        created_at:
          type: string
          format: date-time
          description: The timestamp of when the refund was created in UTC.
        currency:
          oneOf:
            - type: 'null'
            - $ref: '#/components/schemas/Currency'
              description: >-
                The currency of the refund, represented as an ISO 4217 currency
                code.
        is_partial:
          type: boolean
          description: If true the refund is a partial refund
        payment_id:
          type: string
          description: The unique identifier of the payment associated with the refund.
        reason:
          type:
            - string
            - 'null'
          description: The reason provided for the refund, if any. Optional.
        refund_id:
          type: string
          description: The unique identifier of the refund.
        status:
          $ref: '#/components/schemas/RefundStatus'
          description: The current status of the refund.
    RefundStatus:
      type: string
      enum:
        - succeeded
        - failed
        - pending
        - review

````