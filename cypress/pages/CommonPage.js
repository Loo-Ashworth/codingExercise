class CommonPage {
    path;
    title;
    heading;

    constructor() {
        this.path = "";
        this.title = "Books Inventory App";
        this.heading = "";
    }

    goto() {
        cy.visit(this.path);
        return this;
    }

    verifyNavigatedTo() {
        cy.url().should("include", this.path);
        return this;
    }
}

export {CommonPage};