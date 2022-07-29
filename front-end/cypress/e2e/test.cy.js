/// <reference types="cypress"/>
import { faker } from "@faker-js/faker";

describe("Submit", () => {
    it("send new video", () => {
        const video = {
            name: faker.music.songName(),
            url: `https://www.youtube.com/watch?v=0R8vKS7QWf4`
        }
        cy.visit("http://localhost:3000");
        cy.get('[placeholder="Name"]').type(video.name);
        cy.get('[placeholder="https://youtu.be/..."]').type(video.url);

        cy.intercept("POST", "/recommendations").as("submitVideo");
        cy.get('.sc-jSMfEi').click();
        cy.wait("@submitVideo");
    })
})

describe("Open Pages", () => {
    it("Open home page", () => {
        cy.visit("http://localhost:3000");
        cy.url().should("equal", "http://localhost:3000/");
    });

    it("Open top page", () => {
        cy.visit("http://localhost:3000/top");
        cy.url().should("equal", "http://localhost:3000/top");
    });

    it("Open random page", () => {
        cy.visit("http://localhost:3000/random");
        cy.url().should("equal", "http://localhost:3000/random");
    });
})