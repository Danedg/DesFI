Cypress.Commands.add('register', () => {
  cy.fixture('user').then((data) => {
    const timestamp = Date.now();
    const email = data.newUser.email.replace('{{timestamp}}', timestamp);
    cy.visit('https://staging-fuse-aws.flatirons.com');
    cy.contains(/sign up/i).click();
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(data.newUser.password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});

Cypress.Commands.add('loginWithEmail', (email, password) => {
  cy.visit('https://staging-fuse-aws.flatirons.com');
  cy.contains(/login/i).click();
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('setViewport', (type) => {
  if (type === 'mobile') {
    cy.viewport(375, 667);
  } else {
    cy.viewport(1280, 720);
  }
});
