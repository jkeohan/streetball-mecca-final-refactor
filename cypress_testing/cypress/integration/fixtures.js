/// <reference types="Cypress"/>
// the above enables auto complete

// Mocha is js test framework

describe('Login feature test', () => {

    before(() => {
			cy.visit('/');
			cy.viewport('macbook-15');
		});

    it('', () => {
        cy.fixture('example').then(ex => cy.log(ex))
    })

})