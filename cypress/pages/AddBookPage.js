import {CommonPage} from "./CommonPage";
import {FrontEndPaths} from "../fixtures/BooksListURIs";

class AddBookPage extends CommonPage {

    constructor() {
        super();
        this.path = FrontEndPaths.addBook;
        this.heading = "Add a New Book";
    }

    addBookButton() {
        return cy.get('button:contains("Add Book")');
    }

    headingLocator() {
        return cy.get("#add-book-heading");
    }

    errorSummary() {
        return cy.get('div:contains("Please correct the following errors:")');
    }

    inputForm() {
        return cy.get("form[aria-labelledby='add-book-heading']");
    }

    titleInput() {
        return cy.get("#title");
    }

    titleError() {
        return cy.get("#title-error");
    }

    authorInput() {
        return cy.get("#author");
    }

    authorError() {
        return cy.get("#author-error");
    }

    genreSelector() {
        return cy.get("#genre");
    }

    genreError() {
        return cy.get("#genre-error");
    }

    isbnInput() {
        return cy.get("#isbn");
    }

    isbnError() {
        return cy.get("#isbn-error");
    }

    publicationDateInput() {
        return cy.get("#publicationDate");
    }

    publicationDateError() {
        return cy.get("#publicationDate-error");
    }

    priceInput() {
        return cy.get("#price");
    }

    priceError() {
        return cy.get("#price-error");
    }

    confirmErrorSummaryIsVisible() {
        this.errorSummary().should('be.visible')
            .and('contain.text', 'Please correct the following errors:');
    }

    enterTitle(title) {
        this.titleInput().clear();
        this.titleInput().type(title);
    }

    confirmTitleErrorIsDisplayed(expectedMessage) {
        this.titleError().should('contain.text', expectedMessage);
    }

    enterAuthor(author) {
        this.authorInput().clear();
        this.authorInput().type(author);
    }

    confirmAuthorErrorIsDisplayed(expectedMessage) {
        this.authorError().should('contain.text', expectedMessage);
    }

    enterIsbn(isbn) {
        this.isbnInput().clear();
        this.isbnInput().type(isbn);
    }

    confirmIsbnErrorIsDisplayed(expectedMessage) {
        this.isbnError().should('contain.text', expectedMessage);
    }

    enterPublicationDate(publicationDate) {
        this.publicationDateInput().clear();
        this.publicationDateInput().type(publicationDate);
    }

    confirmPublicationDateErrorIsDisplayed(expectedMessage) {
        this.publicationDateError().should('contain.text', expectedMessage);
    }

    enterPrice(price) {
        this.priceInput().clear();
        this.priceInput().type(price);
    }

    confirmPriceErrorDisplayed(expectedMessage) {
        this.priceError().should('contain.text', expectedMessage);
    }

    selectGenre(genre) {
        this.genreSelector().select(genre);
    }

    confirmGenreErrorIsDisplayed(expectedMessage) {
        this.genreError().should('contain.text', expectedMessage);
    }

    clickAddBookButton() {
        this.addBookButton().click();
    }

    enterAllAddBookFieldsAndSubmit(title, author, genre, isbn, publicationDate, price) {
        this.enterTitle(title);
        this.enterAuthor(author);
        this.selectGenre(genre);
        this.enterIsbn(isbn);
        this.enterPublicationDate(publicationDate);
        this.enterPrice(price);
        this.clickAddBookButton();
    }
}

export {AddBookPage};