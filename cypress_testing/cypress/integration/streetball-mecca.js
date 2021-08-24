/// <reference types="Cypress"/>
// the above enables auto complete

// npx cypress open

describe('Input feature test', function () {
	before(() => {
		cy.visit('/');
		cy.viewport('macbook-15');
		// cy.get('input[name=name]').as('input');
	});

	beforeEach(() => {
		// cy.visit('/');
		cy.viewport('macbook-15');
		cy.get('input[name=name]').as('input');
		cy.fixture('park').as('park');
		cy.get('#bar-chart').as('barChart');
	});

	it('test clicking on input once displays the dropdown and clicking on input again hides the dropdown ', () => {
		// cy.wait(1000);
		cy.get('#court > input').click();
		cy.wait(100);
		cy.get('#choice-options').should('exist');
		cy.get('input[name=name]').click();
		cy.get('#choice-options').should('not.exist');
	});

	it('test clicking on input once displays the dropdown and clicking on map hides the dropdown ', () => {
		// cy.wait(1000);
		cy.get('#court > input').click();
		cy.wait(100);
		cy.get('#choice-options').should('exist');
		cy.get('.park-image').click();
		cy.get('#choice-options').should('not.exist');
	});

	it('test typing park name into input filters dropdown to display only that park', () => {
		// cy.visit('/');
		cy.wait(100);
		cy.get('input[name=name]').as('input');
		cy.get('@input')
			.type('100% Playground')
			.should('have.value', '100% Playground');
		cy.get('.choice').should(($choice) => {
			expect($choice).to.have.length(1);
		});
	});

	it('test clicking on the first park in dropdown adds its name to the input field', () => {
		cy.visit('/');
		cy.wait(100);
		cy.get('@input').click();
		cy.get('.choice').eq(0).click();
		cy.get('@input').should('have.value', '100% Playground');
		// cy.get('@input').clear();
	});

	it('test map displays only that park based on the previous test', () => {
		// WORKS by adding an active class
		// cy.get('circle')
		// 	.filter('.active')
		// 	.then((park) => cy.log(park))
		// 	.its('length')
		// 	.should('eq', 1);

		// WORKS by pushing elements into an array and counting the array length
		let activeCircles = [];
		cy.get('circle')
			.each((circle) => {
				// cy.log('circle', circle.css('opacity'));
				if (circle.css('opacity') == 1) {
					activeCircles.push(circle);
				}
			})
			.then(() => activeCircles)
			.its('length')
			.should('eq', 1);

		cy.wrap(activeCircles).each((d) => {
			cy.get(d)
				.invoke('attr', 'data-park')
				.should('contain', '100% Playground');
		});
	});

	it('test the main image displays the park url and title', () => {
		cy.get('@park').then((park) => {
			cy.get('.park-image')
				.should('have.css', 'background-image')
				.and('contain', park.url);
			cy.get('#title').contains(park.name);
		});
	});

	it('test clicking on the first park in dropdown filters neighborhoods to only that parks neighborhood', () => {
		cy.get('#bar-chart').find('.neighborhood').should('have.length', 1);
	});

	it('test clicking on the first park in dropdown sets borough to that parks borough', () => {
		cy.get('#boroughs').should('have.value', 'Brooklyn');
	});

	it('test on page load all neighborhoods display', () => {
		cy.visit('/');
		cy.wait(100)
		cy.get('@barChart').find('.neighborhood').its('length').should('eq', 51);
		// cy.get('#bar-chart').find('.neighborhood').its('length').should('be.gte', 1)
	});

	it('test clicking on first neighborhood filters must-see parks based on selected neighborhood', () => {
		cy.get('@barChart').find('.neighborhood').eq(0).as('neighborhood');
		cy.get('@neighborhood').click();
		cy.get('@barChart').find('.neighborhood').eq(0).find('.circle').as('circles')
		cy.get('.must-see').its('length').should('eq', 2);
		cy.get('@neighborhood').find('.circle').its('length').should('eq',2)
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
				cy.log('circle', circle)
				cy.get(circle)
					.invoke('attr', 'data-park')
					.should('contain', 'Central Park (Great Lawn)');
			});

	// 	// let activeCircles = [];
	// 	// cy.get('circle')
	// 	// 	.each((circle) => {
	// 	// 		if (circle.css('opacity') == 1) {
	// 	// 			activeCircles.push(cy.get(circle));
	// 	// 		}
	// 	// 	})
	// 	// 	.then(() => activeCircles)
	// 	// 	.its('length')
	// 	// 	.should('eq', 2);
	});

	// it('test typing a park name in the input will filter the list of parks', () => {});
});


rfc