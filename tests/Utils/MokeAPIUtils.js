class MokeAPIUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
            {
                data: this.loginPayload
            }
        );
        const loginResJSON = await loginResponse.json();
        console.log(loginResJSON);
        const token = loginResJSON.token;
        return token;
    }
}

module.exports = { MokeAPIUtils };
