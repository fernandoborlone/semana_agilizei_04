declare namespace Cypress {
    interface Chainable {

        /**
         * @example cy.login()
         * Comando utilizado para realizar login via interface gráfica

         */

        login(): void

        /**
         * @example cy.login_via_api()
         * Comando utilizado para realizar login via api
         */

        login_via_api(): void
    }
}