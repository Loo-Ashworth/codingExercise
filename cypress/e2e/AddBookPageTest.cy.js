import {LoginPage} from "../pages/LoginPage";
import {AddBookPage} from "../pages/AddBookPage";
import {FrontEndPaths} from "../fixtures/BooksListURIs";

describe('Tests covering the page specific behaviour of the add book page', () => {
    let loginPage;
    let addBookPage;

    beforeEach(() => {
        loginPage = new LoginPage();
        addBookPage = new AddBookPage();
        loginPage.loginAs("admin1", "securePassword");
        addBookPage.goto();
        addBookPage.verifyNavigatedTo();
    });

    it('should validate the default page content for add book page', () => {
        addBookPage.headingLocator().should('contain.text', addBookPage.heading);
        addBookPage.inputForm().should('contain.text', 'Title')
            .and('contain.text', 'Author')
            .and('contain.text', 'Genre')
            .and('contain.text', 'ISBN')
            .and('contain.text', 'Publication Date')
            .and('contain.text', 'Price');
        addBookPage.addBookButton().should('be.visible');
    });

    it('should display error messages when mandatory fields are empty', () => {
        addBookPage.clickAddBookButton();
        addBookPage.confirmErrorSummaryIsVisible();
        addBookPage.confirmTitleErrorIsDisplayed("Title is required.");
        addBookPage.confirmAuthorErrorIsDisplayed("Author is required.");
        addBookPage.confirmGenreErrorIsDisplayed("Genre is required.");
        addBookPage.confirmIsbnErrorIsDisplayed("ISBN is required.");
        addBookPage.confirmPublicationDateErrorIsDisplayed("Publication Date is required.");
        addBookPage.confirmPriceErrorDisplayed("Price is required.");
    });

    it('should successfully add book and redirect to book List page when all inputs are valid', () => {
        addBookPage.enterAllAddBookFieldsAndSubmit(
            "Valid Title",
            "Stephen Valid",
            "Fiction",
            "978-3-16-148410-0",
            "01/02/1999",
            "9.99");
        cy.url().should("include", FrontEndPaths.bookList);
    });

    it('should display error messages for invalid title input lengths', () => {
        addBookPage.enterTitle("a".repeat(32));
        addBookPage.confirmTitleErrorIsDisplayed("Title cannot exceed 30 characters");
    });

    it('should not allow invalid (non integer) price inputs', () => {
        addBookPage.enterPrice("This is not a valid price");
        addBookPage.clickAddBookButton();
        addBookPage.confirmErrorSummaryIsVisible();
        addBookPage.confirmPriceErrorDisplayed("Price is required.")
    });

    it('should verify invalid date formats', () => {
        addBookPage.enterPublicationDate("this is not a valid date");
        addBookPage.clickAddBookButton();
        addBookPage.confirmErrorSummaryIsVisible();
        addBookPage.confirmPublicationDateErrorIsDisplayed("Publication Date is Invalid.");
    });

    it('should verify invalid ISBN formats', () => {
        addBookPage.enterIsbn("This is not a valid ISBN");
        addBookPage.clickAddBookButton();
        addBookPage.confirmErrorSummaryIsVisible();
        addBookPage.confirmIsbnErrorIsDisplayed("ISBN is Invalid");
    });

    it.skip('should ensure the add book page is free of accessibility violations', () => {
        // Todo: Implement accessibility scan for page
    });
});