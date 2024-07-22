import { TestBed } from '@angular/core/testing';

import { PokemonFiltersService } from './pokemon-filters.service';

describe('PokemonFiltersService', () => {
  let service: PokemonFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
