import {CommonPage} from "./CommonPage";
import {FrontEndPaths} from "../fixtures/BooksListURIs";

class EditBookPage extends CommonPage {

    constructor() {
        super();
        this.path = FrontEndPaths.editBook;
        this.heading = "Edit book details";
    }

    headingLocator() {
        return cy.get(`h2:contains(${this.heading})`);
    }

    errorSummary() {
        return cy.get("missingErrorSummary");
    }

    editBookForm() {
        return cy.get("form");
    }

    titleInput() {
        return cy.get("#edit-title");
    }

    authorInput() {
        return cy.get("#edit-author");
    }

    genreInput() {
        return cy.get("#edit-genre");
    }

    isbnInput() {
        return cy.get("#edit-isbn");
    }

    publicationDateInput() {
        return cy.get("#edit-publicationDate");
    }

    priceInput() {
        return cy.get("#edit-price");
    }

    saveChangesButton() {
        return cy.get("#save-changes");
    }

    //todo Verify expected Error Summary Behaviour and Locator
    confirmErrorSummaryIsVisible() {
        this.errorSummary().should('be.visible')
            .and('contain.text', 'Please correct the following errors:');
    }

    enterTitle(input) {
        this.titleInput().clear();
        this.titleInput().type(input);
        return this;
    }

    enterAuthor(input) {
        this.authorInput().clear();
        this.authorInput().type(input);
        return this;
    }

    enterGenre(input) {
        this.genreInput().clear();
        this.genreInput().type(input);
        return this;
    }

    enterIsbn(input) {
        this.isbnInput().clear();
        this.isbnInput().type(input);
        return this;
    }

    enterPublicationDate(input) {
        this.publicationDateInput().clear();
        this.publicationDateInput().type(input);
        return this;
    }

    enterPrice(input) {
        this.priceInput().clear();
        this.priceInput().type(input);
        return this;
    }

    clickSaveChanges() {
        this.saveChangesButton().click();
        return this;
    }

    enterAllEditBookFieldsAndSubmit(title, author, genre, isbn, publicationDate, price) {
        this.enterTitle(title);
        this.enterAuthor(author);
        this.enterGenre(genre);
        this.enterIsbn(isbn);
        this.enterPublicationDate(publicationDate);
        this.enterPrice(price);
        this.clickSaveChanges();
        return this;
    }

}

export {EditBookPage};