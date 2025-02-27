import {BookListPage} from "../pages/BookListPage";
import {LoginPage} from "../pages/LoginPage";
import {FrontEndPaths} from "../fixtures/BooksListURIs";
import {AddBookPage} from "../pages/AddBookPage";

describe('Tests covering the page specific behaviour of the book list page', () => {
    let bookListPage;
    let loginPage;

    beforeEach(() => {
        bookListPage = new BookListPage();
        loginPage = new LoginPage();
        loginPage.loginAs("admin1", "securePassword");
    });

    it('should validate the default page content for book list page', () => {
        bookListPage.headingLocator().should('contain.text', bookListPage.heading);
        bookListPage.addBookButton().should('be.visible');
        bookListPage.booksListTable().should('be.visible');
        bookListPage.previousPageButton().should('be.visible');
        bookListPage.nextPageButton().should('be.visible');
        bookListPage.pageNumber().should('contain.text', 'Page');
        bookListPage.totalCounter().should('contain.text', 'Total Book Titles:');
    });

    it('should display a welcome message and a logout button upon successful login', () => {
        bookListPage.welcomeAdminMessage().should('contain.text', "Welcome, Admin!");
        bookListPage.logoutButton().should("be.visible");
    });

    it('should direct to add a book page when user clicks add a book', () => {
        bookListPage.clickAddBookButton();
        cy.url().should("include", FrontEndPaths.addBook);
    });

    it('should ensure user is returned to login page when clicking logout', () => {
        bookListPage.clickLogout();
        cy.url().should("include", FrontEndPaths.login);
    });

    it('should increment the total books counter when books are added', () => {
        let addBookPage = new AddBookPage();

        bookListPage.totalCounter().should('contain.text', 'Total Book Titles: 3');
        bookListPage.clickAddBookButton();
        addBookPage.enterAllAddBookFieldsAndSubmit("new", "author", "Fiction", "1234", "01/02/2024", "1.99");
        bookListPage.totalCounter().should('contain.text', 'Total Book Titles: 4');
    });

    it('should no longer display deleted books', () => {
        bookListPage.clickDeleteButtonForBookTitle("The Very Busy Spider");
        bookListPage.confirmRowContainingBookTitleDoesNotExist("The Very Busy Spider");
    });

    it('should decrement the total books counter when books are deleted', () => {
        bookListPage.totalCounter().should('contain.text', 'Total Book Titles: 3');
        bookListPage.clickDeleteButtonForBookTitle("The Very Busy Spider");
        bookListPage.totalCounter().should('contain.text', 'Total Book Titles: 2');
    });

    it('should include functional page scrolling for numerous books', () => {
        let addBookPage = new AddBookPage();

        for (let i = 0; i < 3; i++) {
            bookListPage.clickAddBookButton();
            addBookPage.enterAllAddBookFieldsAndSubmit(`newBook${i}`, "author", "Fiction", "1234", "01/02/2024", "1.99");
        }

        bookListPage.pageNumber().should('contain.text', "Page 1 of 2");
        bookListPage.clickNextPageButton();
        bookListPage.pageNumber().should('contain.text', "Page 2 of 2");
        bookListPage.confirmRowContainingBookTitleIsVisible("newBook2");
        bookListPage.clickPreviousPageButton();
        bookListPage.pageNumber().should('contain.text', "Page 1 of 2");
        bookListPage.confirmRowContainingBookTitleIsVisible("newBook0");
    });

    it.skip('should ensure the add book page is free of accessibility violations', () => {
        // Todo: Implement accessibility scan for page
    });
});