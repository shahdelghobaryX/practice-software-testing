describe('Practice Software Testing — Final Suite', () => {

  let users;
  let products;

  before(() => {
    cy.fixture('users').then((data) => { users = data; });
    cy.fixture('products').then((data) => { products = data; });
  });

  beforeEach(() => {
    cy.navigateHome();
  });

  // =========================
  // REGISTRATION
  // =========================

  it('TC-01 Register success', () => {
    cy.registerUser(users.newUser);

    cy.url().should('satisfy', (url) =>
      url.includes('/auth/login') || url.includes('/auth/register')
    );
    cy.get('body').should('be.visible');
    cy.get('[data-test="email"]').should('exist');
  });

  it('TC-02 Register existing email', () => {
    cy.visit('/auth/register');

    cy.get('[data-test="first-name"]').type(users.newUser.firstName);
    cy.get('[data-test="last-name"]').type(users.newUser.lastName);
    cy.get('[data-test="dob"]').type(users.newUser.dob);
    cy.get('[data-test="street"]').type(users.newUser.address);
    cy.get('[data-test="city"]').type(users.newUser.city);
    cy.get('[data-test="state"]').type(users.newUser.state);
    cy.get('[data-test="country"]').select(users.newUser.country);

    cy.get('body').then(($body) => {
      if ($body.find('[data-test="postcode"]').length > 0) {
        cy.get('[data-test="postcode"]').type(users.newUser.postcode);
      }
    });

    cy.get('[data-test="phone"]').type(users.newUser.phone);
    cy.get('[data-test="email"]').type(users.existingUser.email);
    cy.get('[data-test="password"]').type('Cypress#99Test');

    cy.get('[data-test="register-submit"]').scrollIntoView().should('be.visible').click();
    cy.wait(3000);

    cy.url().should('include', '/auth/register');
    cy.get('[data-test="register-submit"]').should('exist');
    cy.get('[data-test="email"]').should('not.have.value', '');
  });

  it('TC-03 Register validation', () => {
    cy.visit('/auth/register');
    cy.get('[data-test="register-submit"]').click();

    cy.get('[data-test="first-name"]').should('have.class', 'ng-invalid');
    cy.get('[data-test="last-name"]').should('have.class', 'ng-invalid');
    cy.get('[data-test="email"]').should('have.class', 'ng-invalid');
  });

  // =========================
  // LOGIN
  // =========================

  it('TC-04 Login success', () => {
    cy.login(users.existingUser.email, users.existingUser.password);

    cy.url().should('not.include', '/auth/login');
    cy.get('[data-test="nav-menu"]').should('be.visible');
    cy.get('[data-test="login-submit"]').should('not.exist');
  });

  it('TC-05 Login wrong', () => {
    cy.login(users.invalidUser.email, users.invalidUser.password);

    cy.url().should('include', '/auth/login');
    cy.get('[data-test="login-error"]').should('be.visible');
    cy.get('[data-test="login-error"]').should('not.have.text', '');
  });

  it('TC-06 Login validation', () => {
    cy.visit('/auth/login');
    cy.get('[data-test="login-submit"]').click();

    cy.get('[data-test="email"]').should('have.class', 'is-invalid');
    cy.get('[data-test="password"]').should('have.class', 'is-invalid');
    cy.url().should('include', '/auth/login');
  });

  // =========================
  // SEARCH
  // =========================

  it('TC-07 Search valid', () => {
    cy.searchProduct(products.searchTerms.valid);

    cy.get('[data-test="product-name"]').should('have.length.at.least', 1);
    cy.get('[data-test="product-name"]').first().should('be.visible');
    cy.get('[data-test="product-name"]').first().should('not.have.text', '');
  });

  it('TC-08 Search no results', () => {
    cy.searchProduct(products.searchTerms.noResults);

    cy.get('body').should('contain.text', 'no products');
    cy.get('[data-test="product-name"]').should('not.exist');
    cy.get('body').should('be.visible');
  });

  it('TC-09 Filter category', () => {
    cy.filterByCategory('Hand Tools');

    cy.get('[data-test="product-name"]').should('have.length.at.least', 1);
    cy.get('[data-test="product-name"]').first().should('be.visible');
    cy.url().should('include', 'category');
  });

  // =========================
  // CART
  // =========================

  it('TC-10 Add to cart', () => {
    cy.login(users.existingUser.email, users.existingUser.password);
    cy.url().should('not.include', '/auth/login');

    cy.navigateHome();
    cy.addFirstProductToCart();

    cy.get('[data-test="cart-quantity"]').should('not.contain', '0');
    cy.get('[data-test="cart-quantity"]').should('be.visible');
    cy.get('[data-test="cart-quantity"]').invoke('text').should('match', /\d+/);
  });

  it('TC-11 Cart info', () => {
    cy.login(users.existingUser.email, users.existingUser.password);
    cy.url().should('not.include', '/auth/login');

    cy.navigateHome();
    cy.addFirstProductToCart();
    cy.goToCart();

    cy.contains('Item').should('be.visible');
    cy.get('.btn-danger').should('have.length.at.least', 1);
    cy.get('[data-test="cart-quantity"]').should('not.contain', '0');
  });

  it('TC-12 Remove from cart', () => {
    cy.login(users.existingUser.email, users.existingUser.password);
    cy.url().should('not.include', '/auth/login');

    cy.navigateHome();
    cy.addFirstProductToCart();
    cy.goToCart();

    cy.get('.btn-danger').first().click();
    cy.wait(1500);

    
    cy.get('body').should('contain.text', 'cart is empty');
    cy.get('.btn-danger').should('not.exist');
    cy.get('body').should('be.visible');
  });

  // =========================
  // CHECKOUT
  // =========================

  it('TC-13 Checkout navigation', () => {
    cy.login(users.existingUser.email, users.existingUser.password);
    cy.url().should('not.include', '/auth/login');

    cy.navigateHome();
    cy.addFirstProductToCart();
    cy.goToCart();
    cy.proceedToCheckout();

    cy.url().should('include', '/checkout');
    cy.get('body').should('contain', 'Total');
    cy.get('[data-test="proceed-2"]').should('exist');
  });

  it('TC-14 Total visible', () => {
    cy.login(users.existingUser.email, users.existingUser.password);
    cy.url().should('not.include', '/auth/login');

    cy.navigateHome();
    cy.addFirstProductToCart();
    cy.goToCart();
    cy.proceedToCheckout();

    cy.get('body').should('contain', 'Total');
    cy.url().should('include', '/checkout');
    cy.get('body').invoke('text').should('match', /\$[\d.]+|[\d.]+/);
  });

  it('TC-15 Validation billing', () => {
    cy.login(users.existingUser.email, users.existingUser.password);
    cy.url().should('not.include', '/auth/login');

    cy.navigateHome();
    cy.addFirstProductToCart();
    cy.goToCart();
    cy.proceedToCheckout();

    cy.get('[data-test="proceed-2"]').click({ force: true });

    cy.get('.ng-invalid').should('exist');
    cy.url().should('include', '/checkout');
    cy.get('.ng-invalid').should('have.length.at.least', 1);
  });

  it('TC-16 Invalid coupon', () => {
    cy.login(users.existingUser.email, users.existingUser.password);
    cy.url().should('not.include', '/auth/login');

    cy.navigateHome();
    cy.addFirstProductToCart();
    cy.goToCart();
    cy.proceedToCheckout();

    cy.url().should('include', '/checkout');
    cy.get('body').should('contain', 'Total');

    cy.get('body').then(($body) => {
      if ($body.find('[data-test="coupon-code"]').length > 0) {
        cy.get('[data-test="coupon-code"]').type('INVALIDCODE999');
        cy.get('[data-test="coupon-submit"]').click();
        cy.get('[data-test="coupon-error"]').should('be.visible');
      } else {
        cy.get('body').should('contain', 'Total');
      }
    });
  });

});