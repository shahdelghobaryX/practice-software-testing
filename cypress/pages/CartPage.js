class CartPage {

    addFirstProductToCart() {

        cy.intercept('GET', '**/products/search*').as('searchForCart');

        cy.get('[data-test="search-query"]')
          .clear()
          .type('Pliers');

        cy.get('[data-test="search-submit"]').click();

        cy.wait('@searchForCart', { timeout: 10000 });

        cy.get('[data-test="product-name"]')
          .first()
          .should('be.visible')
          .click();

        cy.wait(1000);

        cy.get('[data-test="add-to-cart"]')
          .should('be.visible')
          .click();

        cy.wait(1000);
    }

    goToCart() {

        cy.get('[data-test="nav-cart"]')
          .should('be.visible')
          .click();

        cy.wait(1000);
    }

    proceedToCheckout() {

        cy.contains('Proceed to checkout')
          .should('be.visible')
          .click();

        cy.wait(1500);
    }

}

export default CartPage;