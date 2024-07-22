import {PokemonCardComponent} from "@shared/components/pokemon-card/pokemon-card.component";

describe('Pokemon Card Component', () => {
  it('can mount', () => {
    cy.mount(PokemonCardComponent);
  });
});
