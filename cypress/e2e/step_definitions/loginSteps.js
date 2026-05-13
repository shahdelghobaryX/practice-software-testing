import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";

import LoginPage from '../../pages/LoginPage'

const loginPage = new LoginPage()

let userData

Before(() => {

    cy.fixture('users').then((data) => {

        userData = data

    })

})

Given('user opens login page', () => {

    loginPage.visit()

})

When('user enters valid email', () => {

    loginPage.enterEmail(userData.validUser.email)

})

When('user enters valid password', () => {

    loginPage.enterPassword(userData.validUser.password)

})

When('user clicks login', () => {

    loginPage.clickLogin()

})

Then('user should login successfully', () => {

    cy.url().should('include', 'account')

    cy.contains('My account').should('be.visible')

    cy.get('[data-test="nav-menu"]').should('exist')

})