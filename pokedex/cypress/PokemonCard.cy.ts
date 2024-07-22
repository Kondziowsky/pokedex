import {PokemonCardComponent} from "@shared/components/pokemon-card/pokemon-card.component";
import card from './fixtures/card.json'

describe('PokemonCard.cy.ts', () => {
  beforeEach("PokemonCardComponent mounted with initial data", function () {
    // cy.fixture("card").as('data');
    cy.mount(PokemonCardComponent, {
      componentProperties: {
        card: card
      },
    })
  })

  it('pokemon card class should appear (card data passed)', () => {
    cy.get('.pokemon-card');
  });

  it('should display a pokemon card.json with image', () => {
    cy.get('.pokemon-card', {timeout: 3000}).should('exist').within(() => {
      cy.get('mat-card-content img')
        .should('have.attr', 'src')
        .should('include', 'https://images.pokemontcg.io/smp/SM113.png');
      cy.get('mat-card-content img')
        .should('have.attr', 'alt')
        .should('include', 'Ash\'s Pikachu');
    });
  });

    it('should have the correct appearance and size', () => {
      cy.get('.pokemon-card').should('have.class', 'mat-mdc-card');
      cy.get('mat-card-content img')
        .should('have.attr', 'height', '342')
        .should('have.attr', 'width', '245');
    });
});
