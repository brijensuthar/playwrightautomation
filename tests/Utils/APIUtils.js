class APIUtils {

    constructor(apiContext, LoginPayload) {
        this.apiContext = apiContext;
        this.LoginPayload = LoginPayload;
    }

    async getToken() {
        // Login API
        const LoginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.LoginPayload
            }
        );
        const LoginResponseJson = await LoginResponse.json();
        const token = LoginResponseJson.token;
        //console.log(token);
        return token;
    }

    // async createOrder(OrderPayload) {
    //     let response = {};
    //     response.token = await this.getToken();
    //     const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    //         {
    //             data: OrderPayload,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': response.token
    //             }
    //         }
    //     );
    //     const orderResponseJson = await orderResponse.json();
    //     const orderId = orderResponseJson.orders[0];
    //     response.orderId = orderId;
    //     return response;
    // }
}

module.exports = { APIUtils };