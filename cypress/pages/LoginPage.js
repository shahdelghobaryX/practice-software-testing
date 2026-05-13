class LoginPage {

visit() {

    cy.visit('/auth/login', {
        failOnStatusCode: false
    });

}

   enterEmail(email) {

    cy.get('[data-test="email"]', { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type(email);

}
   enterPassword(password) {

    cy.get('[data-test="password"]', { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type(password);

}

    clickLogin() {
        cy.get('[data-test="login-submit"]').click();
    }

}

export default LoginPage;