import {BookListPage} from "../pages/BookListPage";
import {LoginPage} from "../pages/LoginPage";
import {AddBookPage} from "../pages/AddBookPage";
import {EditBookPage} from "../pages/EditBookPage";
import {FrontEndPaths} from "../fixtures/BooksListURIs";

describe('Tests covering the page specific behaviour of the edit book page', () => {
    let loginPage;
    let bookListPage;
    let addBookPage;
    let editBookPage;

    beforeEach(() => {
        loginPage = new LoginPage();
        bookListPage = new BookListPage();
        addBookPage = new AddBookPage();
        editBookPage = new EditBookPage();

        loginPage.loginAs("admin1", "securePassword");
        addBookPage.goto();
        addBookPage.enterAllAddBookFieldsAndSubmit("editBookTitle", "Sally Edit", "Fiction", "12345", "01/02/2020", "9.99");
        bookListPage.clickEditButtonForBookTitle("editBookTitle");
        editBookPage.verifyNavigatedTo();
    });

    it('should validate the default page content for edit book page', () => {
        editBookPage.headingLocator().should('contain.text', editBookPage.heading);
        editBookPage.editBookForm().should('contain.text', 'Title')
            .and('contain.text', 'Author')
            .and('contain.text', 'Genre')
            .and('contain.text', 'ISBN')
            .and('contain.text', 'Publication Date')
            .and('contain.text', 'Price');
        editBookPage.saveChangesButton().should('be.visible');
    });

    it('should display error messages for empty inputs', () => {
        editBookPage.enterAllEditBookFieldsAndSubmit(" ", " ", " ", " ", " ", " ");
        editBookPage.confirmErrorSummaryIsVisible();
        //todo Error Summary is Absent but Errors are Focussed - Inconsistent
    });

    it('should display error messages for the input validations required by add a book page', () => {
        editBookPage.enterAllEditBookFieldsAndSubmit(
            "TooLongTitle".repeat(4),
            "An Author",
            "Not part of selections available",
            "This is not an ISBN",
            "This is not a valid date",
            "This is not a price"
        );
        editBookPage.confirmErrorSummaryIsVisible();
        //todo Error Summary is Absent but Errors are Focussed - Inconsistent
    });

    it('should successfully redirect to book list page on valid edit', () => {
        editBookPage.enterTitle("newBookTitle");
        editBookPage.clickSaveChanges();
        cy.url().should("include", FrontEndPaths.bookList);
    });

    it.skip('should ensure the edit book page is free of accessibility violations', () => {
        // Todo: Implement accessibility scan for page
    });

});