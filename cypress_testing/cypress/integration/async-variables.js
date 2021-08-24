/// <reference types="Cypress"/>
// the above enables auto complete

// npx cypress open

describe('Login feature test', function() {
	beforeEach(() => {
        cy.visit('/');
		// save the url as a variable
		cy.url().as('url');
	});

	it('test getting the url', () => {
		// using @url we can use the value in the url
		// cy.get('@url');
        this.url // this can only be used using the function keyword and not => 
	});

	it('test getting the url', () => {
		// using @url we can use the value in the url
		// cy.get('@url');
        this.url
	});
});
