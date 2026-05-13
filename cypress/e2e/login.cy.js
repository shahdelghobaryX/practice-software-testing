import LoginPage from '../pages/LoginPage'

describe('Login Tests', () => {

    const loginPage = new LoginPage()

    it('Valid Login', () => {

        loginPage.visit()

        loginPage.enterEmail('customer@practicesoftwaretesting.com')

        loginPage.enterPassword('welcome01')

        loginPage.clickLogin()

        // Assertions
        cy.url().should('include', 'account')

        cy.contains('My account').should('be.visible')

        cy.get('[data-test="nav-menu"]').should('exist')

    })

})