import {CommonPage} from "./CommonPage";
import {FrontEndPaths} from "../fixtures/BooksListURIs";

class LoginPage extends CommonPage {

    constructor() {
        super();
        this.path = FrontEndPaths.login;
        this.heading = "Login";
    }

    headingLocator() {
        return cy.get("#login-heading");
    }

    usernameInput() {
        return cy.get("#username");
    }

    passwordInput() {
        return cy.get("#password",);
    }

    showPasswordButton() {
        return cy.get("button[aria-label^='Show']");
    }

    hidePasswordButton() {
        return cy.get("button[aria-label^='Hide']");
    }

    loginButton() {
        return cy.get("#login-button");
    }

    errorSummaryBox() {
        return cy.get('div:contains("There is a problem with your submission")')
    }

    errorHeading() {
        return cy.get("h3:contains('There is a problem with your submission')")
    }

    errorsList() {
        return cy.get("ul");
    }

    usernameInputError() {
        return cy.get("#username-error");
    }

    passwordInputError() {
        return cy.get("#password-error");
    }

    enterUsername(username) {
        this.usernameInput().clear();
        this.usernameInput().type(username);
        return this;
    }

    enterPassword(password) {
        this.passwordInput().clear();
        this.passwordInput().type(password);
        return this;
    }

    clickShowPassword() {
        this.showPasswordButton().click();
        return this;
    }

    clickHidePassword() {
        this.hidePasswordButton().click();
        return this;
    }

    clickLoginButton() {
        this.loginButton().click();
        return this;
    }

    loginAs(username, password) {
        this.goto();
        this.enterUsername(username);
        this.enterPassword(password);
        this.clickLoginButton();
        return this;
    }

    confirmErrorSummaryIsVisible() {
        this.errorSummaryBox().should('be.visible');
        this.errorHeading().should("be.visible")
            .and('contain.text', 'There is a problem with your submission');
        return this;
    }

    confirmUsernameErrorIsVisible(expectedMessage) {
        this.errorsList().should("be.visible")
            .and('contain.text', expectedMessage);
        this.usernameInputError().should('be.visible')
            .and('contain.text', expectedMessage);
        return this;
    }

    confirmPasswordErrorIsVisible(expectedMessage) {
        this.errorsList().should("be.visible")
            .and('contain.text', expectedMessage);
        this.passwordInputError().should('be.visible')
            .and('contain.text', expectedMessage);
        return this;
    }

    confirmErrorMessageIsVisible(expectedMessage) {
        this.errorsList().should("be.visible")
            .and('contain.text', expectedMessage);
        return this;
    }

}

export {LoginPage};