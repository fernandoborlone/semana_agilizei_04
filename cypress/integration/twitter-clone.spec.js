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
    context('twitters', () => {
        it('Deve criar twitter', () => {

            cy.cria_twitter(twitter)
            cy.get('.Toastify__toast-body')
                .should('be.visible')
                .and('contain', 'Your tweet has been posted')
        })

        it('Deve excluir twitter', () => {

            cy.cria_twitter(twitter)
            cy.get('.Toastify__toast-body')
                .should('not.be.visible')

            cy.exclui_twitter()

            cy.get('.Toastify__toast-body')
                .should('be.visible')
                .and('contain', 'Your tweet has been deleted')
        })

    })
})