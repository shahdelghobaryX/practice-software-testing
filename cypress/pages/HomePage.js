class HomePage {

    navigateHome() {
        cy.visit('/');
    }

   searchProduct(term) {

    cy.get('[data-test="search-query"]', { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type(term);

    cy.get('[data-test="search-submit"]')
      .should('be.visible')
      .click();

}

    filterByCategory(category) {

        cy.get('[data-test="nav-categories"]').click();

        cy.contains(category).click();

        cy.wait(1000);
    }

}

export default HomePage;