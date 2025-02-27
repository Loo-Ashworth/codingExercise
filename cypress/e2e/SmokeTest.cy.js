import {LoginPage} from "../pages/LoginPage";
import {BookListPage} from "../pages/BookListPage";
import {AddBookPage} from "../pages/AddBookPage";
import {EditBookPage} from "../pages/EditBookPage";

describe('A single test covering the critical behaviours of the Library Management System', () => {
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

    it('should allow users to login, add, edit and delete books', () => {
        // Login
        loginPage.goto();
        loginPage.loginAs("admin1", "securePassword");

        // Add Book
        bookListPage.clickAddBookButton();
        addBookPage.enterAllAddBookFieldsAndSubmit(
            "Book Title",
            "Stephen Valid",
            "Fiction",
            "978-3-16-148410-0",
            "01/02/1999",
            "9.99");
        bookListPage.verifyNavigatedTo();
        bookListPage.confirmRowContainingBookTitleIsVisible("Book Title");

        // Edit Book
        bookListPage.clickEditButtonForBookTitle("Book Title");
        editBookPage.enterAllEditBookFieldsAndSubmit(
            "New Title",
            "New Author",
            "Non-Fiction",
            "987654321",
            "03/02/2020",
            "10.00"
        );
        bookListPage.confirmRowContainingBookTitleDoesNotExist("Book Title");
        bookListPage.confirmRowContainingBookTitleIsVisible("New Title");

        // Delete Book
        bookListPage.clickDeleteButtonForBookTitle("New Title");
        bookListPage.confirmRowContainingBookTitleDoesNotExist("New Title");
    });
});