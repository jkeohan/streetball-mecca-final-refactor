/// <reference types="Cypress"/>
// the above enables auto complete

// npx cypress open

describe('Input feature test', function () {
	before(() => {
		cy.visit('/');
		cy.viewport('macbook-15');
	});

	beforeEach(() => {
		cy.viewport('macbook-15');
	});

	it('should have a value', () => {
		cy.get('input[name=name]')
			.type('100% Playground')
			.should('have.value', '100% Playground');
	});

});

// color: rgb(48, 106, 156);