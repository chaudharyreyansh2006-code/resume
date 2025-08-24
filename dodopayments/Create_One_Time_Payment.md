# Create One Time Payment

> Create a one-time payment for a customer.

## OpenAPI

````yaml post /payments
paths:
  path: /payments
  method: post
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
      query: {}
      header: {}
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              allowed_payment_method_types:
                allOf:
                  - type:
                      - array
                      - 'null'
                    items:
                      $ref: '#/components/schemas/PaymentMethodTypes'
                    description: >-
                      List of payment methods allowed during checkout.


                      Customers will **never** see payment methods that are
                      **not** in this list.

                      However, adding a method here **does not guarantee**
                      customers will see it.

                      Availability still depends on other factors (e.g.,
                      customer location, merchant settings).
                    uniqueItems: true
              billing:
                allOf:
                  - $ref: '#/components/schemas/BillingAddress'
                    description: Billing address details for the payment
              billing_currency:
                allOf:
                  - oneOf:
                      - type: 'null'
                      - $ref: '#/components/schemas/Currency'
                        description: >-
                          Fix the currency in which the end customer is billed.

                          If Dodo Payments cannot support that currency for this
                          transaction, it will not proceed
              customer:
                allOf:
                  - $ref: '#/components/schemas/CustomerRequest'
                    description: Customer information for the payment
              discount_code:
                allOf:
                  - type:
                      - string
                      - 'null'
                    description: Discount Code to apply to the transaction
              metadata:
                allOf:
                  - $ref: '#/components/schemas/Metadata'
                    description: |-
                      Additional metadata associated with the payment.
                      Defaults to empty if not provided.
              payment_link:
                allOf:
                  - type:
                      - boolean
                      - 'null'
                    description: >-
                      Whether to generate a payment link. Defaults to false if
                      not specified.
              product_cart:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/OneTimeProductCartItemReq'
                    description: >-
                      List of products in the cart. Must contain at least 1 and
                      at most 100 items.
              return_url:
                allOf:
                  - type:
                      - string
                      - 'null'
                    description: |-
                      Optional URL to redirect the customer after payment.
                      Must be a valid URL if provided.
              show_saved_payment_methods:
                allOf:
                  - type: boolean
                    description: |-
                      Display saved payment methods of a returning customer
                      False by default
              tax_id:
                allOf:
                  - type:
                      - string
                      - 'null'
                    description: >-
                      Tax ID in case the payment is B2B. If tax id validation
                      fails the payment creation will fail
            required: true
            refIdentifier: '#/components/schemas/CreateOneTimePaymentRequest'
            requiredProperties:
              - product_cart
              - customer
              - billing
        examples:
          example:
            value:
              allowed_payment_method_types:
                - credit
              billing:
                city: <string>
                country: AF
                state: <string>
                street: <string>
                zipcode: <string>
              billing_currency: null
              customer:
                customer_id: <string>
              discount_code: <string>
              metadata: {}
              payment_link: true
              product_cart:
                - amount: 123
                  product_id: <string>
                  quantity: 1
              return_url: <string>
              show_saved_payment_methods: true
              tax_id: <string>
    codeSamples:
      - lang: JavaScript
        source: |-
          import DodoPayments from 'dodopayments';

          const client = new DodoPayments({
            bearerToken: 'My Bearer Token',
          });

          const payment = await client.payments.create({
            billing: { city: 'city', country: 'AF', state: 'state', street: 'street', zipcode: 'zipcode' },
            customer: { customer_id: 'customer_id' },
            product_cart: [{ product_id: 'product_id', quantity: 0 }],
          });

          console.log(payment.payment_id);
      - lang: Python
        source: |-
          from dodopayments import DodoPayments

          client = DodoPayments(
              bearer_token="My Bearer Token",
          )
          payment = client.payments.create(
              billing={
                  "city": "city",
                  "country": "AF",
                  "state": "state",
                  "street": "street",
                  "zipcode": "zipcode",
              },
              customer={
                  "customer_id": "customer_id"
              },
              product_cart=[{
                  "product_id": "product_id",
                  "quantity": 0,
              }],
          )
          print(payment.payment_id)
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
            payment, err := client.Payments.New(context.TODO(), dodopayments.PaymentNewParams{
              Billing: dodopayments.F(dodopayments.BillingAddressParam{
                City: dodopayments.F("city"),
                Country: dodopayments.F(dodopayments.CountryCodeAf),
                State: dodopayments.F("state"),
                Street: dodopayments.F("street"),
                Zipcode: dodopayments.F("zipcode"),
              }),
              Customer: dodopayments.F[dodopayments.CustomerRequestUnionParam](dodopayments.AttachExistingCustomerParam{
                CustomerID: dodopayments.F("customer_id"),
              }),
              ProductCart: dodopayments.F([]dodopayments.OneTimeProductCartItemParam{dodopayments.OneTimeProductCartItemParam{
                ProductID: dodopayments.F("product_id"),
                Quantity: dodopayments.F(int64(0)),
              }}),
            })
            if err != nil {
              panic(err.Error())
            }
            fmt.Printf("%+v\n", payment.PaymentID)
          }
      - lang: Ruby
        source: |-
          require "dodopayments"

          dodo_payments = Dodopayments::Client.new(
            bearer_token: "My Bearer Token",
            environment: "test_mode" # defaults to "live_mode"
          )

          payment = dodo_payments.payments.create(
            billing: {city: "city", country: :AF, state: "state", street: "street", zipcode: "zipcode"},
            customer: {customer_id: "customer_id"},
            product_cart: [{product_id: "product_id", quantity: 0}]
          )

          puts(payment)
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              client_secret:
                allOf:
                  - type: string
                    description: |-
                      Client secret used to load Dodo checkout SDK
                      NOTE : Dodo checkout SDK will be coming soon
              customer:
                allOf:
                  - $ref: '#/components/schemas/CustomerLimitedDetailsResponse'
                    description: Limited details about the customer making the payment
              discount_id:
                allOf:
                  - type:
                      - string
                      - 'null'
                    description: The discount id if discount is applied
              expires_on:
                allOf:
                  - type:
                      - string
                      - 'null'
                    format: date-time
                    description: Expiry timestamp of the payment link
              metadata:
                allOf:
                  - $ref: '#/components/schemas/Metadata'
                    description: Additional metadata associated with the payment
              payment_id:
                allOf:
                  - type: string
                    description: Unique identifier for the payment
              payment_link:
                allOf:
                  - type:
                      - string
                      - 'null'
                    description: Optional URL to a hosted payment page
              product_cart:
                allOf:
                  - type:
                      - array
                      - 'null'
                    items:
                      $ref: '#/components/schemas/OneTimeProductCartItemReq'
                    description: Optional list of products included in the payment
              total_amount:
                allOf:
                  - type: integer
                    format: int32
                    description: >-
                      Total amount of the payment in smallest currency unit
                      (e.g. cents)
                    minimum: 0
            refIdentifier: '#/components/schemas/CreateOneTimePaymentResponse'
            requiredProperties:
              - payment_id
              - total_amount
              - client_secret
              - customer
              - metadata
        examples:
          example:
            value:
              client_secret: <string>
              customer:
                customer_id: <string>
                email: <string>
                name: <string>
              discount_id: <string>
              expires_on: '2023-11-07T05:31:56Z'
              metadata: {}
              payment_id: <string>
              payment_link: <string>
              product_cart:
                - amount: 123
                  product_id: <string>
                  quantity: 1
              total_amount: 1
        description: One Time payment successfully initiated
    '422':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Invalid Request Object or Parameters
        examples: {}
        description: Invalid Request Object or Parameters
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
    AttachExistingCustomer:
      title: Attach Existing Customer
      type: object
      required:
        - customer_id
      properties:
        customer_id:
          type: string
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
    CustomerRequest:
      oneOf:
        - $ref: '#/components/schemas/AttachExistingCustomer'
        - $ref: '#/components/schemas/NewCustomer'
    Metadata:
      type: object
      additionalProperties:
        type: string
      propertyNames:
        type: string
    NewCustomer:
      type: object
      required:
        - name
        - email
      properties:
        email:
          type: string
        name:
          type: string
        phone_number:
          type:
            - string
            - 'null'
    OneTimeProductCartItemReq:
      type: object
      required:
        - product_id
        - quantity
      properties:
        amount:
          type:
            - integer
            - 'null'
          format: int32
          description: >-
            Amount the customer pays if pay_what_you_want is enabled. If
            disabled then amount will be ignored

            Represented in the lowest denomination of the currency (e.g., cents
            for USD).

            For example, to charge $1.00, pass `100`.
        product_id:
          type: string
        quantity:
          type: integer
          format: int32
          minimum: 0
    PaymentMethodTypes:
      type: string
      enum:
        - credit
        - debit
        - upi_collect
        - upi_intent
        - apple_pay
        - cashapp
        - google_pay
        - multibanco
        - bancontact_card
        - eps
        - ideal
        - przelewy24
        - affirm
        - klarna
        - sepa
        - ach
        - amazon_pay
        - afterpay_clearpay

````