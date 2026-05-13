class HomePage {

    navigateHome() {
        cy.visit('/');
    }

    searchProduct(term) {

        cy.intercept('GET', '**/products/search*').as('searchRequest');

        cy.get('[data-test="search-query"]')
          .clear()
          .type(term);

        cy.get('[data-test="search-submit"]').click();

        cy.wait('@searchRequest', { timeout: 10000 });
    }

    filterByCategory(category) {

        cy.get('[data-test="nav-categories"]').click();

        cy.contains(category).click();

        cy.wait(1000);
    }

}

export default HomePage;