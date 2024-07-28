import { Http, HttpResponse } from "@nativescript/core";
// Import the LogService class
import LogService from './log-service.js';

// Instantiate the LogService class
const logService = new LogService();


export default class AuthService {
    constructor(region, userPoolId, userPoolClientId) {
        this.region = region;
        this.userPoolId = userPoolId;
        this.userPoolClientId = userPoolClientId;
        this.url = `https://cognito-idp.${region}.amazonaws.com/`;
        this.http = new Http();
    }
    async signIn(username, password) {
        logService.log(`Signing in user ${username}`);

        const headers = {
            "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
            "Content-Type": "application/x-amz-json-1.1"
        };

        const content = {
            "AuthParameters": {
                "USERNAME": username,
                "PASSWORD": password
            },
            "AuthFlow": "USER_PASSWORD_AUTH",
            "ClientId": this.userPoolClientId
        };


        try {
            const response = await http.request({
                url: this.url,
                method: "POST",
                headers: headers,
                content: JSON.stringify(content)
            });

            const responseContent = response.content.toJSON();
            // Handle successful response
            console.log(responseContent);
            logService.log(`User ${username} signed in successfully`);

            if (responseContent.AuthenticationResult) {
                sessionStorage.setItem("idToken", responseContent.AuthenticationResult.IdToken || '');
                sessionStorage.setItem("accessToken", responseContent.AuthenticationResult.AccessToken || '');
                sessionStorage.setItem("refreshToken", responseContent.AuthenticationResult.RefreshToken || '');
                sessionStorage.setItem("expiresIn", responseContent.AuthenticationResult.ExpiresIn || '');
                return responseContent.AuthenticationResult;
            }
        } catch (e) {
            logService.log(`Error signing in user ${username} with error = ${e.message}`);

            // Handle error
            console.log(e);
        }

        return null;
    }
}
