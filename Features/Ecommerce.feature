Feature: Ecommerce Validations

    @Regression
    Scenario: Placing the order

        Given Login with usernmae "brijensuthar@gmail.com" and password "Brijen@123"

        When Add "ZARA COAT 3" product into cart

        Then verify product successsfully added into cart

        When Add details of card

        Then Verify order successsfully placed