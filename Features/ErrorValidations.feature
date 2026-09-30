Feature: Ecommerce2 Validations

    @Validations
    Scenario Outline: Login with invalid credential

        Given Login with invalid username "<username>" and password "<password>"

        Then verify error message is displayed

        Examples:
        | username     |  password  |
        | brijensuthar |  brijen123 |
        | vipulsuthar  |  vipul123  | 


    