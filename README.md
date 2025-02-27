# Install dependencies

```
npm install
```

# To run the test

```
npx cypress run
```

# Exercise Outline

### Business Requirement

Only authorized users are permitted to access the books catalog and make changes. Both the login and books form pages include validation measures.
Upon successful login, users are taken to a books list page, where they can create, read, update, and delete books. The books list page also features a welcome message and a logout button. When the logout button is clicked, users are returned to the login page.

### Task

As a tester, your goal is to evaluate the implementation of the Books Inventory Application against the above requirements. Identify any potential gaps in the implementation and write tests to ensure the developers have met the requirements.
At a minimum, you should include automated tests covering at least one successful user journey from user login to adding a book. Additionally, you should include some checks to ensure the error messages are displayed to the user when adding a book with invalid data.

# Candidate Notes:

## Requirements Analysis

#### Minimum Automated Test Coverage Stipulated:

* A complete journey including login and adding a book
* Checks to ensure error messages are displayed when adding a book with invalid data

#### Minimum Automated Test Coverage Based on Business Requirements:

* Login screen should include validation measures
* Books form page should include validation measures
* Only authorised users can access books list (not invalid users)
* Only authorised users can add books (not invalid users)
* Only authorised users can edit books (not invalid users)
* Only authorised users can delete books (not invalid users)
* Books list should display welcome message on login
* Books list should display logout button on login
* Logout button should return users to login page

## Assumptions Made and Framework Explanation:

## Assumptions

* I have written the test framework under the assumption that a lower-level UI framework or unit tests have not been implemented.
* The result is perhaps a higher level of granular coverage in some places than might be ideal in an end-to-end framework.
* A test pyramid approach would ideally move more page-level tests to a lower-level framework such as within the UI service tests.
* At the same time, a comprehensive end-to-end test such as this, included as part of a CICD pipeline would allow for faster development, due the range of regressions it would capture, giving confidence to deploy.

## Summary

#### There are a total of 39 tests of varying granularity covering high level business requirements but also page level implementation details that should reasonably be expected from the service.

#### 11 of the tests are failing tests (at the time of writing) and coincide with defects identified based on the Business Requirement or reasonable expectations.

#### 4 are placeholders (pending) for accessibility scanning not yet implemented as installing additional dependencies is potentially beyond the scope of this exercise. 

## Design

The tests utilise a page object model with limited inheritance for a small number of functions which would otherwise be duplicated on every page class, the priority is ease of re-use and readability to make extension/maintenance of the codebase easier.

## Test Structure

There are three levels of testing which will include some duplication of coverage if executed in its entirety:

* [Page Tests](cypress/e2e/LoginPageTest.cy.js)

Tests which cover individual page implementations such as input validation, potentially accessibility and default page content with minimal dependencies.
Most of these tests would be suitable for moving into a lower-level framework such as a page rendering or UI-service test. (They do not cover end to end or full business requirements so they need to be paired with e2e regardless of whether they are moved to a lower level for optimal coverage.)

* [Core E2e Test](cypress/e2e/CoreE2eTest.cy.js)

This is a more robust but less granular end-to-end style test which covers core functionality/behaviours based on business requirements. (Less granular coverage, this might be sufficient on its own if the page tests were covered at a lower level.)

* [Smoke Test](cypress/e2e/SmokeTest.cy.js)

Finally, there is a single smoke test, (Which would not normally be executed alongside page/e2e) which covers the full end to end flow of a user but again sacrifices more granular page-based coverage.

## Gaps in Implementation (Defects Identified)

The following issues were identified (evidenced by failing tests) in the current implementation of the service:

#### [Core End-to-End Journey](cypress/e2e/CoreE2eTest.cy.js)

1) ❌ should present dates correctly as they were input (month and day are flipped compared to input)
2) ❌ should not allow invalid books to be created via edit
3) ❌ should not allow unauthorised users to access the book list app
4) ❌ should not allow unauthorised users to add books
5) ❌ should not allow unauthorised users to edit books
6) ❌ should not allow unauthorised users to delete books

#### [Add book Page](cypress/e2e/AddBookPageTest.cy.js)

1) ❌ should verify invalid date formats
2) ❌ should verify invalid ISBN formats

#### [Book list Page](cypress/e2e/BookListPageTest.cy.js)

1) ❌ should ensure user is returned to login page when clicking logout

#### [Edit book Page](cypress/e2e/EditBookPageTest.cy.js)

1) ❌ should display error messages for empty inputs
2) ❌ should display error messages for the input validations required by add a book page

#### Defects Not Covered by Tests

1) ❌ Edit Book Page: Genre is free text instead of select option on edit book page
2) ❌ Edit Book Page: Length Input Validations for fields except title is absent meaning styling of books list page can be easily distorted
3) ❌ Login/Books List: When a valid session is active, and the page is refreshed, the welcome banner disappears

### Specific Business Requirements Missed in Implementation

* ❌ Only authorized users are permitted to access the books catalog and make changes.
* ❌ Both the login and books form pages include validation measures (Partial).
* ❌ When the logout button is clicked, users are returned to the login page.
* Ambiguous AC - Requirements mention being able to read books - does this mean read the table or are we expecting book contents?

## Areas for Extension or Improvement

* Implementation of consistent test-id tag element would improve locator matching and maintenance.
* Page tests would be more reliably and quickly executed as part of a set of UI tests which could be integrated into the UI Service.
* Placeholder tests have been included (skipped) for an accessibility scan of each page potentially using axe or a similar library.
* Sessions could be cached using Cypress’s built in session tooling via a custom login command to increase execution times and test different authorisation levels.
* Reporter library may be useful to quickly identify defects and integrate into CI-CD pipelines as test artefacts.
* Parallelization would allow for faster execution times as test coverage grows.