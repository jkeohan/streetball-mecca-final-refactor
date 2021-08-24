/// <reference types="Cypress"/>
// the above enables auto complete

// Mocha is js test framework

describe('Login feature test', () => {
	// cy.visit("http://localhost:3000")
	// cy.visit("cypress/index.html")
	// can setup a baseUrl in cypress.json

	before(() => {
		cy.visit('/');
		cy.viewport('macbook-16');
	});

	// it('should test the all 3 filter buttons filter the dashboard', () => {
	// 	cy.wait(1000)
	// 	cy.get('.park-rating_filters h3').eq(0).click({multiple:true});
	// 	cy.wait(2000)
	// 	cy.get('.park-rating_filters h3').eq(1).click();
	// 	cy.wait(2000)
	// 	cy.get('.park-rating_filters h3').eq(2).click();
	// 	cy.wait(2000)
	// });

	// it('should test the parks in the filter the dashaboard', () => {
	// 	cy.viewport("macbook-16");
	// 	cy.get('li.must-see').eq(0).click();
	// 	cy.wait(2000)
	// 	cy.get('li.must-see').eq(1).click();
	// 	cy.wait(2000)
	// });

	it('should test the first park in filter by rating section to confirm, when active or clicked, it has a background color of rgba(155, 155, 155, 0.4', () => {
				cy.viewport('macbook-16');
						cy.wait(2000);
		// cy.get('li.must-see').eq(0).trigger('click').should('have.css', 'background', 'rgba(155, 155, 155, 0.4)')
		cy.get('li.must-see')
			.eq(0)
			.trigger('click')
			// work
			// .should('have.attr', 'style', 'background: rgba(155, 155, 155, 0.4);')

			.should('have.css', 'background')
			.and('contain', 'rgba(155, 155, 155, 0.4)');
			cy.wait(2000)

		cy.get('input[name=name]');
		// don't work
		// .should('have.css', 'background').and('eql','rgba(155, 155, 155, 0.4)')
		// .should('have.css', 'background').and('eql','rgba(155, 155, 155, 0.4)')

	});

	it('should test that the dropdown items for the input display', () => {
		cy.wait(2000);
		// cy.viewport('macbook-16');
		cy.get('input[name=name]').click();
		cy.wait(2000);
		cy.get('.choice').eq(0).click();
		// cy.log('parkChoice', cy.get('.parkChoice'));
	});

	// it('should test that the dropdown items for the input display', () => {
	//    cy.get('input[name=name]).eq(0).click();
	// })
});
// describe('Login feature test', () => {
// 	['macbook-15', 'iphone-x'].forEach((size) => {
// 		it('should visit the login page ' + size, () => {
// 			// cy.visit("http://localhost:3000")
// 			// cy.visit("cypress/index.html")
// 			// can setup a baseUrl in cypress.json
// 			cy.viewport(size);
// 			cy.visit('/');
// 			cy.get('.park-image');
// 			cy.get('.must-see').eq(0).click();
// 		});
// 	});
// });

// grouping test cases
// describe('Login feature test', () => {
// 	// Mocha HOOKS run either once or before/after each test case within it
// 	// before
// 	// beforeEach
// 	// after
// 	// afterEach

// 	before(() => {
// 		cy.log('Run the server locally');
// 		cy.
// 	});

// 	after(() => {
// 		cy.log('kill the server');
// 	});

// 	beforeEach(() => {
// 		cy.log('Navigate to login page');
// 	});

// 	it('should visit the login page correctly', () => {
// 		cy.log('website should have the correct url');
// 	});

// 	it('should be able to login', () => {
// 		cy.log('fill the username/password and login');
// 		cy.log('should navigate to login page');
// 	});
// });
