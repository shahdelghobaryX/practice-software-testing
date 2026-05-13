class LoginPage {

    visit() {
        cy.visit('/auth/login');
    }

    enterEmail(email) {
        cy.get('[data-test="email"]')
          .should('be.visible')
          .clear()
          .type(email);
    }

    enterPassword(password) {
        cy.get('[data-test="password"]')
          .should('be.visible')
          .clear()
          .type(password);
    }

    clickLogin() {
        cy.get('[data-test="login-submit"]').click();
    }

}

export default LoginPage;