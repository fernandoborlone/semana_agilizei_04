/// <reference types="cypress"/>

Cypress.Commands.add('login', (email, password) => {
    cy.get('input[type="email"]').type(email || Cypress.env('email'), { log: false })
    cy.get('input[type="password"]').type(password || Cypress.env('password'), { log: false })
    cy.get('button[type="submit"]').click()

})

Cypress.Commands.add('cria_twitter', (twitter) => {
    cy.get('textarea[type="text"]').type(twitter)
    cy.get('button[class*="pDAkO"]').click()
})

Cypress.Commands.add('exclui_twitter', () => {
    cy.get('div[class*="cKJzHK"]')
        .should('be.visible')
        .children()
        .first()
    cy.get('svg[class*="fUsLpG"]')
        .last()
        .click()
})

Cypress.Commands.add('login_via_api', () => {
    cy.getToken().then(resp => {
        const { token, user} = resp.body.data.login

        window.localStorage.setItem('token', token)
        window.localStorage.setItem('user', JSON.stringify(user))
    })
})

Cypress.Commands.add('getToken', () => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('url_api')}`,
        body: {
            "operationName": "login",
            "variables": {
                email: `${Cypress.env('email')}`,
                password: `${Cypress.env('password')}`
            },
            query: "mutation login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    token\n    user {\n      id\n      handle\n      avatar\n      fullname\n      __typename\n    }\n    __typename\n  }\n}\n"
        }
    })
})