describe('Loading Pages', () => {
  it('visits the homepage', () => {
    cy.visit('/') // yields the window object
      .its('navigator.language') // yields window.navigator.language
      .should('equal', 'en-US') // asserts the expected value


    // cy.contains('h1', 'Hi, my name is');
    // cy.contains('Yuniel Acosta');
  });

  it('visits the blog page', () => {
    // wait for the page to load
    cy.visit('/blog').wait(1000);
    cy.get('#sidebar').should('be.visible');
    cy.contains('Tags');
    cy.contains('Categories');
    cy.contains('Vue 3 with Typescript and Decorators');
  });
  //
  // it('can click the blog', () => {
  //   cy.visit('/');
  //
  //   cy.get('[data-cypress=blog]').click();
  //
  //   cy.url().should('include', '/blog');
  //   cy.contains('Introduction to Gridsome');
  // });
  //
  // it('can visit a single blog post', () => {
  //   cy.visit('/introduction-to-gridsome');
  //
  //   cy.url().should('include', '/introduction-to-gridsome');
  //   cy.contains('Introduction to Gridsome');
  // });
  //
  // it('can click a single blog post', () => {
  //   cy.visit('/blog');
  //
  //   cy.contains('Introduction to Gridsome').click();
  //
  //   cy.url().should('include', '/introduction-to-gridsome');
  //   cy.contains('Introduction to Gridsome');
  // });
  //
  // describe('Page Scroll to Sections', () => {
  //   it('can scroll to Project', () => {
  //     cy.visit('/');
  //
  //     cy.get('[data-cypress=projects]').click();
  //     cy.get('#projects').should('be.visible');
  //   });
  //
  //   it('can scroll to About', () => {
  //     cy.visit('/');
  //
  //     cy.get('[data-cypress=about]').click();
  //     cy.get('#about').should('be.visible');
  //   });
  //
  //   it('can scroll to Contact', () => {
  //     cy.visit('/');
  //
  //     cy.get('[data-cypress=contact]').click();
  //     cy.get('#contact').should('be.visible');
  //   });
  // });
  //
  // describe('Pagination', () => {
  //   it('the next button works', () => {
  //     cy.visit('/blog');
  //
  //     cy.get('[data-cypress=next').click();
  //     cy.url().should('include', '/blog/2');
  //     cy.contains('Vue vs React Comparison');
  //   });
  //
  //   it('the prev button works', () => {
  //     cy.visit('/blog/2');
  //
  //     cy.get('[data-cypress=prev').click();
  //     cy.url().should('include', '/blog');
  //     cy.contains('Introduction to Gridsome');
  //   });
  // });
  //
  // describe('Tags for posts', () => {
  //   it('can visit tags page', () => {
  //     cy.visit('/tag/frontend');
  //
  //     cy.contains('Tag: frontend');
  //     cy.contains('Introduction to Gridsome');
  //     cy.contains('How to Get Better At Coding');
  //     cy.contains('Top 5 Static Site Generators in Vue');
  //   });
  //
  //   it('can click on tags from blog post page', () => {
  //     cy.visit('/introduction-to-gridsome');
  //
  //     cy.contains('frontend').click();
  //     cy.url().should('include', '/tag/frontend');
  //     cy.contains('Tag: frontend');
  //     cy.contains('Introduction to Gridsome');
  //   });
  // });

// describe('Theme Switcher', () => {
//   it('can change to dark theme', () => {
//     cy.visit('/')

//     cy.get('[data-cypress=switchTheme]').click({force: true})
//     cy.get('.content-wrapper').should('have.class', 'dark')
//   })

//   it('can change to light theme', () => {
//     cy.visit('/')

//     cy.get('[data-cypress=switchTheme]').click({force: true})
//     cy.get('[data-cypress=switchTheme]').click({force: true})
//     cy.get('.content-wrapper').should('have.class', 'light')
//   })
// })

// describe('Search with Vue Fuse', () => {
//   it('can search for blog posts', () => {
//     cy.visit('/')

//     cy.get('[data-cypress=search-results]').should('not.be.visible')
//     cy.get('[data-cypress=search]').type('Introduction')
//     cy.get('[data-cypress=search-results]').should('be.visible')
//     cy.contains('Introduction to Gridsome')
//     cy.contains('Gridsome is a Vue.js-powered')
//   })

//   it('can search for docs', () => {
//     cy.visit('/')

//     cy.get('[data-cypress=search-results]').should('not.be.visible')
//     cy.get('[data-cypress=search]').type('mark')
//     cy.get('[data-cypress=search-results]').should('be.visible')
//     cy.contains('Vue Components in Markdown')
//   })
// })

// Doesn't work all the time, so I'm skipping it until I figure it out
//   describe.skip('Mobile View', {
//     viewportWidth: 400,
//   }, () => {
//     it('shows the hamburger menu', () => {
//       cy.visit('/');
//
//       cy.get('[data-cypress=menu]').should('not.be.visible');
//       cy.get('[data-cypress=hamburger]').should('be.visible').click();
//       cy.get('[data-cypress=menu]').should('be.visible');
//     });
//   });
});
