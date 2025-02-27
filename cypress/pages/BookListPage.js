import {CommonPage} from "./CommonPage";
import {FrontEndPaths} from "../fixtures/BooksListURIs";

class BookListPage extends CommonPage {

    constructor() {
        super();
        this.path = FrontEndPaths.bookList;
        this.heading = "Book List";
    }

    welcomeAdminMessage() {
        return cy.get("h2:contains('Welcome, Admin!')");
    }

    logoutButton() {
        return cy.get('button:contains("Log Out")');
    }

    headingLocator() {
        return cy.get(`h2:contains(${this.heading})`);
    }

    booksListTable() {
        return cy.get("table");
    }

    addBookButton() {
        return cy.get("button[class$='add-book-button']");
    }

    previousPageButton() {
        return cy.get("button[class$='prev-button']");
    }

    nextPageButton() {
        return cy.get("button[class$='next-button']");
    }

    pageNumber() {
        return cy.get("span:contains('Page')");
    }

    totalCounter() {
        return cy.get("h3:contains('Total Book Titles:')");
    }

    clickLogout() {
        this.logoutButton().click();
        return this;
    }

    confirmRowContainingBookTitleIsVisible(bookTitle) {
        cy.contains("tr", bookTitle).should('be.visible');
        return this;
    }

    confirmValueIsPresentInRowForBookTitle(bookTitle, value) {
        cy.contains("tr", bookTitle).should('contain.text', value);
        return this;
    }

    confirmRowContainingBookTitleDoesNotExist(bookTitle) {
        cy.contains("tr", bookTitle).should('not.exist');
        return this;
    }

    clickEditButtonForBookTitle(bookTitle) {
        cy.contains("tr", bookTitle).find("[id^=edit-book]").click();
        return this;
    }

    clickDeleteButtonForBookTitle(bookTitle) {
        cy.contains("tr", bookTitle).find("[id^=delete-book]").click();
        return this;
    }

    clickAddBookButton() {
        this.addBookButton().click();
        return this;
    }

    clickNextPageButton() {
        this.nextPageButton().click();
        return this;
    }

    clickPreviousPageButton() {
        this.previousPageButton().click();
        return this;
    }
}

export {BookListPage};