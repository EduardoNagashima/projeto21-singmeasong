describe("Submit", () => {
    it("send new video", () => {
        cy.visit("http://localhost:3000");
        cy.get('[placeholder="Name"]').type('Primeiro teste 2');
        cy.get('[placeholder="https://youtu.be/..."]').type('https://www.youtube.com/watch?v=LKkhfH8zSxM');

        cy.intercept("POST", "/").as("submitVideo");
        cy.get('.sc-jSMfEi').click();
        cy.wait("@submitVideo");

        cy.contains("Meu lindo post que acabei de criar").should("be.visible");
        cy.get('[placeholder="Name"]').should('');
    })
})