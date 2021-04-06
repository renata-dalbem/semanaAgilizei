/// <reference types= 'cypress' />

let Chance = require('chance');
let chance = new Chance();

context('cadastro', () => {
    it('cadastro de usuário no site', () => {
        cy.server()
        // cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**')
        // .as('postNewtable');

        // cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**')
        // .as('postUsertable');

        // cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**')
        // .as('getNewtable');

        cy.route({
            method: 'POST',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: {}
        }).as('postNewtable');

        cy.route({
            method: 'POST',
            url: '**/api/1/databases/userdetails/collections/usertable?**',
            status: 200,
            response: {}
        }).as('postUsertable');

        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: {}
        }).as('getNewtable');


        //baseUrl + register URL
        cy.visit('Register.html');
        //type
        cy.get('input[placeholder^=First]').type(chance.first());
        cy.get('input[placeholder^=Last]').type(chance.last());
        cy.get('input[ng-model^=Email]').type(chance.email());
        cy.get('input[ng-model^=Phone]').type(chance.phone({ formatted: false }));
        //check - radio e checkbox
        cy.get('input[value="FeMale"]').check();
        cy.get('input[type="checkbox"]').check('Movies');
        cy.get('input[type="checkbox"]').check('Hockey');
        //select
        cy.get('select#Skills').select('Javascript');
        cy.get('select#countries').select('Australia');
        cy.get('select#country').select('New Zealand', { force: true });
        cy.get('select#yearbox').select('1996');
        cy.get('select[ng-model="monthbox"]').select('January');
        cy.get('select#daybox').select('13');
        cy.get('input#firstpassword').type('Agilizei@2021');
        cy.get('input#secondpassword').type('Agilizei@2021');
        //attach file
        cy.get('input[type="file"]').attachFile('imagem.jpg');
        //click
        cy.get('button#submitbtn').click();

        cy.wait('@postNewtable').then((resNewtable) => {
            expect(resNewtable.status).to.eq(200)
        })

        cy.wait('@postUsertable').then((resUsertable) => {
            expect(resUsertable.status).to.eq(200)
        })
        cy.wait('@getNewtable').then((resNewtable) => {
            expect(resNewtable.status).to.eq(200)
        })

        cy.url().should('contain', 'WebTable')
    })
})