import {LoginPage} from "../pages/LoginPage";
import {FrontEndPaths} from "../fixtures/BooksListURIs";

describe('Tests covering the page specific behaviour of the login page', () => {
    let loginPage;

    beforeEach(() => {
        loginPage = new LoginPage();
        loginPage.goto();
        loginPage.verifyNavigatedTo();
    });

    it('should validate the default empty login page content', () => {
        loginPage.headingLocator().should('be.visible')
            .and('contain.text', loginPage.heading);
        loginPage.usernameInput().should('be.empty');
        loginPage.passwordInput().should('be.empty');
        loginPage.errorSummaryBox().should('not.exist');
    });

    it('should display error messages when mandatory fields are empty', () => {
        loginPage.clickLoginButton();
        loginPage.confirmErrorSummaryIsVisible();
        loginPage.confirmUsernameErrorIsVisible("Please enter your username");
        loginPage.confirmPasswordErrorIsVisible("Please enter your password");
    });

    it('should display error messages for an invalid login attempt', () => {
        loginPage.loginAs("invalidUser", "InvalidPassword");
        loginPage.confirmErrorSummaryIsVisible();
        loginPage.confirmErrorMessageIsVisible("Invalid username or password. Please try again.");
    });

    it('should redirect users to books list page upon successful login', () => {
        loginPage.loginAs("admin1", "securePassword");
        cy.url().should("include", FrontEndPaths.bookList);
    });

    it('should ensure passwords are hidden unless show password is toggled', () => {
        loginPage.enterPassword("TestPassword");
        loginPage.passwordInput().should("contain.text", "");
        loginPage.passwordInput().should("have.attr", 'type', "password");

        loginPage.clickShowPassword();
        loginPage.passwordInput().should("have.attr", 'type', "text");

        loginPage.clickHidePassword();
        loginPage.passwordInput().should("contain.text", "");
        loginPage.passwordInput().should("have.attr", 'type', "password");
    });

    it.skip('should ensure the login page is free of accessibility violations', () => {
        // Todo: Implement accessibility scan for page
    });
});
