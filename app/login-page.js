// pages/login-page.js
import { Page, Frame } from '@nativescript/core';
import { LoginViewModel } from './view-models/login-view-model';
// Import the LogService class
import LogService from './services/log-service.js';

// Instantiate the LogService class
const logService = new LogService();

export class LoginPage extends Page {
    constructor() {
        super();
        this.bindingContext = new LoginViewModel();
    }

    createView() {
        logService.log('login-page.js->createView()');
        const stack = new StackLayout();
        const emailField = new TextField();
        emailField.hint = "Email";
        emailField.bind({ sourceProperty: 'email', targetProperty: 'text', twoWay: true });

        const passwordField = new TextField();
        passwordField.hint = "Password";
        passwordField.secure = true;
        passwordField.bind({ sourceProperty: 'password', targetProperty: 'text', twoWay: true });

        const loginButton = new Button();
        loginButton.text = "Login";
        loginButton.bind({ sourceProperty: 'login', targetProperty: 'tap' });

        const signupButton = new Button();
        signupButton.text = "Sign Up";
        signupButton.bind({ sourceProperty: 'signup', targetProperty: 'tap' });

        stack.addChild(emailField);
        stack.addChild(passwordField);
        stack.addChild(loginButton);
        stack.addChild(signupButton);

        return stack;
    }
}

export function onPageLoaded(args) {
    const page = args.object;
    page.bindingContext = new LoginPage();
}