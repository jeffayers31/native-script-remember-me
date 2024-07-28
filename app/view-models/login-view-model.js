// view-models/login-view-model.js
import { Observable } from '@nativescript/core';
import AuthService from '../services/auth-service';
import { Frame } from '@nativescript/core';
import { ApplicationSettings } from "@nativescript/core";
import { MainPage } from '../main-page';
// Import the LogService class
import LogService from './log-service.js';

// Instantiate the LogService class
const logService = new LogService();

export class LoginViewModel extends Observable {
    constructor() {
        super();
        this.email = "";
        this.password = "";
        this.authService = new AuthService(region = 'us-east-1',
            userPoolId = 'us-east-1_ipOfH5cE9',
            userPoolClientId = '4jcufoq9su3kmk2n0usrs2nrh5');
    }

    login() {
        logService.log('login-view-module.js:Login button tapped');

        // Step 1a: User enters their login credentials
        this.authService.signIn(this.email, this.password)
            .then((authenticationResult) => {
                logService.log("LoginViewModel->login()->Login successful");
                Frame.topmost().navigate({ create: () => new MainPage() });
            })
            .catch(error => {
                logService.log(`Login failed ${error}`);
            });
    }

    signup() {
        // Navigate to sign up page or show sign up modal
        console.log("Navigate to sign up");
    }
}
