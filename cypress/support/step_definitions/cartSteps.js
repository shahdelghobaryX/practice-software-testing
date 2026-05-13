import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import HomePage from '../../pages/HomePage'
import CartPage from '../../pages/CartPage'

const homePage = new HomePage()
const cartPage = new CartPage()

Given('user opens home page', () => {

    homePage.navigateHome()

})

When('user searches for a product', () => {

    homePage.searchProduct('Pliers')

})

When('user adds product to cart', () => {

    cartPage.addFirstProductToCart()

})

When('user goes to cart', () => {

    cartPage.goToCart()

})

Then('product should be added successfully', () => {

    cy.contains('Pliers')
      .should('exist')

    cy.contains('Proceed to checkout')
      .scrollIntoView()
      .should('exist')

    cy.url()
      .should('include', 'checkout')

})