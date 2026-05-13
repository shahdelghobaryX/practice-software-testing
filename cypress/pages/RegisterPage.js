class RegisterPage {

    visit() {
        cy.visit('/auth/register');
    }

    registerUser(user) {

        const uniqueEmail = `cypress${Date.now()}@test.com`;

        cy.get('[data-test="first-name"]').type(user.firstName);

        cy.get('[data-test="last-name"]').type(user.lastName);

        cy.get('[data-test="dob"]').type(user.dob);

        cy.get('[data-test="street"]').type(user.address);

        cy.get('[data-test="city"]').type(user.city);

        cy.get('[data-test="state"]').type(user.state);

        cy.get('[data-test="country"]').select(user.country);

        cy.get('[data-test="phone"]').type(user.phone);

        cy.get('[data-test="email"]').type(uniqueEmail);

        cy.get('[data-test="password"]').type('Cypress#99Test');

        cy.get('[data-test="register-submit"]')
          .scrollIntoView()
          .click();
    }

}

export default RegisterPage;