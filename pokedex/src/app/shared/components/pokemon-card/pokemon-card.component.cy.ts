import {PokemonCardComponent} from "@shared/components/pokemon-card/pokemon-card.component";

describe('Pokemon Card Component', () => {
  beforeEach(() => {
    cy.fixture('card.json').as('cardData');
  });
  it('can mount', () => {
    cy.mount(PokemonCardComponent);
  });
  it('should load card.json data', () => {
    cy.fixture('card.json').as('cardData');;
  });
  it('should display a pokemon card.json with image', () => {

    cy.get('.pokemon-card');
    // cy.get('.pokemon-card', { timeout: 3000 }).should('exist').within(() => {
    //   cy.get('mat-card-content img')
    //     .should('have.attr', 'src')
    //     .should('include', 'path-to-image');
    //   cy.get('mat-card-content img')
    //     .should('have.attr', 'alt')
    //     .should('include', 'Pokemon Name');
    // });
  });

  // it('should have the correct appearance and size', () => {
  //   cy.get('.pokemon-card.json').should('have.class', 'mat-mdc-card.json');
  //   cy.get('mat-card.json-content img')
  //     .should('have.attr', 'height', '342')
  //     .should('have.attr', 'width', '245');
  // });
});
