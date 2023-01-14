/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe('Login user', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Fill username
    cy.get('.username').type('fake@email.com');

    // Login
    cy.get('.btn-login').click();
  })
})

describe('Send simple message', () => {
  it('should able to send a message', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Fill username
    cy.get('.username').type('fake@email.com');

    // Login
    cy.get('.btn-login').click();

    cy.get('.message').type('This is a demo message');
    cy.get('.btn-send').click();

    cy.get('.message-item').last().should('contain.text', 'This is a demo message');
  })
})
describe('Validate local storage', () => {
  it('should able to load old messages', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Fill username
    cy.get('.username').type('fake@email.com');

    // Login
    cy.get('.btn-login').click();

    cy.get('.message').type('This is a demo message');
    cy.get('.btn-send').click();

    cy.get('.message-item').last().should('contain.text', 'This is a demo message').should(() => {
      expect(localStorage.getItem('local-chat')).to.not.null;
      const data = JSON.parse(localStorage.getItem('local-chat'));
      console.log(data);
      data.forEach(item => {
        expect(item.message).eq('This is a demo message');
      });
      // expect(localStorage.getItem('local-chat')).contains('This is a demo message');
    });
  })
})

// Prevent TypeScript from reading file as legacy script
export {}
