/// <reference types="cypress"/>

var faker = require('faker');
faker.locale = 'en_US'

/*
Utilizando as boas práticas para escrever os cenários de testes:
https://github.com/goldbergyoni/javascript-testing-best-practices#section-1-the-test-anatomy-1
*/

// Insira do Describe o que está sendo testado: Ex: Tiwitter-clone
describe('Twitter-clone', () => {

    let twitter

    beforeEach(() => {

        twitter = faker.random.words()

        cy.intercept(
            {
                method: 'GET',
                hostname: 'res.cloudinary.com',
            },
            {
                statusCode: 200,
                fixture: 'avatar.png'
            }
        ).as('cloudnary')

        cy.login_via_api()
        cy.visit('/')
    })

    // Insira no contexto uma breve descrição da funcionalidade a ser testada: Ex: Login
     context('Menu de Opções', () => {

        it('Deve visualizar o menu de opções', () => {
            cy.get('nav ul li')
                .should('be.visible')
                .and('have.length', 6)
        })

        it('Deve editar o profile', () => {

            cy.get('a[href="/Fbarbosa"]').click()
            cy.get('span.fullname').should('have.text', 'Fernando Barbosa')
            cy.get('button[class*="action-btn"]').click()
            cy.get('#bio')
                .clear()
                .type('QA Engineer - Desenvolvendo scripts de testes automatizados com o Framework Cypress.io')
            cy.get('button[class*="fUxUJv"]').click()

            cy.get('.Toastify__toast-body')
                .should('be.visible')
                .and('have.text', 'Your profile has been updated 🥳')
        })
    })
})