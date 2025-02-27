import {LoginPage} from "../pages/LoginPage";
import {BookListPage} from "../pages/BookListPage";
import {AddBookPage} from "../pages/AddBookPage";
import {FrontEndPaths} from "../fixtures/BooksListURIs";
import {EditBookPage} from "../pages/EditBookPage";

describe('Tests covering the core functionality and requirements of the Library Management System', () => {
    let bookListPage;
    let loginPage;
    let addBookPage;
    let editBookPage;

    beforeEach(() => {
        bookListPage = new BookListPage();
        loginPage = new LoginPage();
        addBookPage = new AddBookPage();
        editBookPage = new EditBookPage();
    });

    it('should allow authorised users to add a valid book and display fields in the table', () => {
        loginPage.loginAs("admin1", "securePassword");
        bookListPage.verifyNavigatedTo();
        bookListPage.clickAddBookButton();
        addBookPage.verifyNavigatedTo();
        addBookPage.enterAllAddBookFieldsAndSubmit(
            "New Book Title",
            "Stephen Valid",
            "Fiction",
            "978-3-16-148410-0",
            "01/02/1999",
            "9.99");
        bookListPage.verifyNavigatedTo();
        bookListPage.confirmRowContainingBookTitleIsVisible("New Book Title");
        bookListPage.confirmValueIsPresentInRowForBookTitle("New Book Title", "Stephen Valid");
        bookListPage.confirmValueIsPresentInRowForBookTitle("New Book Title", "Fiction");
        bookListPage.confirmValueIsPresentInRowForBookTitle("New Book Title", "978-3-16-148410-0");
        bookListPage.confirmValueIsPresentInRowForBookTitle("New Book Title", "02/01/1999");
        bookListPage.confirmValueIsPresentInRowForBookTitle("New Book Title", "£9.99");
    });

    it('should present dates correctly as they were input', () => {
        loginPage.loginAs("admin1", "securePassword");
        bookListPage.clickAddBookButton();
        addBookPage.enterAllAddBookFieldsAndSubmit(
            "New Book Title",
            "Stephen Valid",
            "Fiction",
            "978-3-16-148410-0",
            "01/02/1999",
            "9.99");
        bookListPage.verifyNavigatedTo();
        bookListPage.confirmValueIsPresentInRowForBookTitle("New Book Title", "01/02/1999");
    });

    it('should not allow invalid books to be added', () => {
        loginPage.loginAs("admin1", "securePassword");
        bookListPage.clickAddBookButton();
        addBookPage.enterAllAddBookFieldsAndSubmit(
            "tooLongTitle".repeat(4),
            "Stephen NotValid",
            "Fiction",
            "Not an isbn",
            "not a date",
            "not a price");
        addBookPage.confirmErrorSummaryIsVisible();
    });

    it('should allow authorised users to edit records with valid values', () => {
        loginPage.loginAs("admin1", "securePassword");
        bookListPage.clickAddBookButton();
        addBookPage.enterAllAddBookFieldsAndSubmit(
            "First Title",
            "First Author",
            "Fiction",
            "123456789",
            "12/01/2020",
            "5.00");

        bookListPage.confirmRowContainingBookTitleIsVisible("First Title")
        bookListPage.clickEditButtonForBookTitle("First Title");
        editBookPage.enterAllEditBookFieldsAndSubmit(
            "New Title",
            "New Author",
            "Non-Fiction",
            "987654321",
            "03/02/2020",
            "10.00"
        );

        bookListPage.confirmRowContainingBookTitleDoesNotExist("First Title");
        bookListPage.confirmRowContainingBookTitleIsVisible("New Title");
        bookListPage.confirmValueIsPresentInRowForBookTitle("New Title", "New Title");
        bookListPage.confirmValueIsPresentInRowForBookTitle("New Title", "New Author");
        bookListPage.confirmValueIsPresentInRowForBookTitle("New Title", "Non-Fiction");
        bookListPage.confirmValueIsPresentInRowForBookTitle("New Title", "987654321");
        bookListPage.confirmValueIsPresentInRowForBookTitle("New Title", "02/03/2020");
        bookListPage.confirmValueIsPresentInRowForBookTitle("New Title", "£10.00");
    });

    it('should not allow invalid books to be created via edit', () => {
        loginPage.loginAs("admin1", "securePassword");
        bookListPage.clickAddBookButton();
        addBookPage.enterAllAddBookFieldsAndSubmit(
            "New Book Title",
            "Stephen Valid",
            "Fiction",
            "978-3-16-148410-0",
            "01/02/1999",
            "9.99");
        bookListPage.clickEditButtonForBookTitle("New Book Title");
        editBookPage.enterAllEditBookFieldsAndSubmit(
            "veryLongTitle".repeat(5),
            "veryLongName".repeat(5),
            "Not an appropriate genre",
            "not an isbn",
            "not a date",
            "9.99");
        bookListPage.confirmRowContainingBookTitleDoesNotExist("veryLongTitle".repeat(5));
    });

    it('should allow authorised users to delete a valid book and remove from the table view', () => {
        loginPage.loginAs("admin1", "securePassword");
        bookListPage.clickDeleteButtonForBookTitle("The Very Busy Spider");
        bookListPage.confirmRowContainingBookTitleDoesNotExist("The Very Busy Spider");
    });

    it('should not allow unauthorised users to access the book list app', () => {
        loginPage.loginAs("invalidUser", "InvalidPassword");
        bookListPage.goto();
        cy.url().should("not.include", FrontEndPaths.bookList);
    });

    it('should not allow unauthorised users to add books', () => {
        loginPage.loginAs("invalidUser", "InvalidPassword");
        bookListPage.goto();
        bookListPage.clickAddBookButton();
        addBookPage.enterAllAddBookFieldsAndSubmit(
            "Should not be allowed",
            "Chris InvalidUser",
            "Fiction",
            "978-3-16-148410-0",
            "01/02/1999",
            "9.99");
        bookListPage.confirmRowContainingBookTitleDoesNotExist("Should not be allowed");
    });

    it('should not allow unauthorised users to edit books', () => {
        loginPage.loginAs("invalidUser", "InvalidPassword");
        bookListPage.goto();
        bookListPage.clickEditButtonForBookTitle("The Very Busy Spider");
        editBookPage.enterAllEditBookFieldsAndSubmit(
            "Should not be allowed",
            "Chris InvalidUser",
            "Fiction",
            "978-3-16-148410-0",
            "01/02/1999",
            "9.99");
        bookListPage.confirmRowContainingBookTitleDoesNotExist("Should not be allowed")
    });

    it('should not allow unauthorised users to delete books', () => {
        loginPage.loginAs("invalidUser", "InvalidPassword");
        bookListPage.goto();
        bookListPage.clickDeleteButtonForBookTitle("Charlotte's Web");
        bookListPage.confirmRowContainingBookTitleIsVisible("Charlotte's Web");
        bookListPage.totalCounter().should('contain.text', "Total Book Titles: 3");
    });

});