/// <reference types="cypress"/>

/*
Utilizando as boas práticas para escrever os cenários de testes:
https://github.com/goldbergyoni/javascript-testing-best-practices#section-1-the-test-anatomy-1
*/

// Insira do Describe o que está sendo testado: Ex: Tiwitter-clone
describe('Twitter-clone', () => {

    beforeEach(() => {

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

        cy.visit('/')


    })

    // Insira no contexto uma breve descrição da funcionalidade a ser testada: Ex: Login
    context('Login', () => {

        // Insira nos It's uma descrição objetiva do resultado esperado
        it('Deve ser direcionado para o feed do Twitter ao informar credenciais válidas', () => {

            cy.login()
            cy.get('.Toastify__toast')
                .should('be.visible')
                .and('have.text', 'You are logged in')
        })

        it('Deve visualizar um alerta ao informar email inválido', () => {

            cy.login('email@invalido.com', 'password_invalido')
            cy.get('.Toastify__toast-body')
                .should('be.visible')
                .and('have.text', 'The email is not registered to an account')
        })

        it('Deve visualizar um alerta ao informar senha inválida', () => {

            cy.login('fbarbosa@gmail.com', 'password_invalido')
            cy.get('.Toastify__toast-body')
                .should('be.visible')
                .and('have.text', 'The password does not match Try again.')
        })
    })
})