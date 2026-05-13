class HomePage {

    navigateHome() {
        cy.visit('/');
    }

   searchProduct(term) {

    cy.visit('/', {
        failOnStatusCode: false
    });

    cy.wait(5000);

    cy.get('[data-test="search-query"]', { timeout: 20000 })
      .should('exist')
      .clear()
      .type(term);

    cy.get('[data-test="search-submit"]')
      .should('exist')
      .click();

}

    filterByCategory(category) {

        cy.get('[data-test="nav-categories"]').click();

        cy.contains(category).click();

        cy.wait(1000);
    }

}

export default HomePage;