c

// npx cypress open

describe('Login feature test', function () {
	beforeEach(() => {
		cy.visit('/');
		// save the url as a variable
		cy.url().as('url');
	});

	it('test using wrap', () => {
		const courses = [{ id: 1, title: 'cypress' }];

        // can only use expect inside of .then()
		cy.wrap(courses).then((courses) => {
			expect(courses[0].title).to.contains('cypress');
		});
		cy.wrap(courses).then((courses) => {
			expect(courses).to.have.length(1);
		});
	});

	it('test using each', () => {
		const courses = [{ id: 1, title: 'cypress' }];

		cy.get('h3').each((h3) => {
			cy.log(h3.text());
            // both tests will fail but do the same thing
			expect(h3.text()).to.contains('filter');
            cy.wrap(h3).should('contains', 'filter')
		});
	});
});
