/// <reference types="Cypress"/>


describe('Input feature test', function () {
	before(() => {
		cy.visit('/');
		cy.viewport('macbook-15');
	});

	beforeEach(() => {
		cy.viewport('macbook-15');
		cy.get('input[name=name]').as('input');
        cy.get('#bar-chart').as('barChart')
		cy.fixture('park').as('park');
	});

	it('test on page load all neighborhoods display', () => {
		cy.get('@barChart').find('.neighborhood').its('length').should('eq', 51);
        // cy.get('#bar-chart').find('.neighborhood').its('length').should('be.gte', 1)
	});

	it('test clicking on first neighborhood filters must-see parks based on selected neighborhood', () => {
		cy.get('@barChart').find('.neighborhood').eq(0).click();
		cy.get('.must-see').its('length').should('eq', 2)
	});

	it('test clicking on first neighborhood shows first park as Central Park (North Meadow)', () => {
		cy.get('.must-see').eq(0).should('contain', 'Central Park (North Meadow)');
	});

	it('test clicking on first neighborhood filters map based on selected neighborhood', () => {
		// cy.get('circle').eq(0).should('contain', 'Central Park (North Meadow)');

		cy.get('circle').filter('.active').its('length').should('eq', 2);

		cy.get('circle')
			.filter('.active')
			.eq(0)
			.then((circle) => {
				cy.get(circle)
					.invoke('attr', 'data-park')
					.should('contain', 'Central Park (North Meadow)');
			});

		// let activeCircles = [];
		// cy.get('circle')
		// 	.each((circle) => {
		// 		if (circle.css('opacity') == 1) {
		// 			activeCircles.push(cy.get(circle));
		// 		}
		// 	})
		// 	.then(() => activeCircles)
		// 	.its('length')
		// 	.should('eq', 2);
	});

})