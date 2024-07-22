import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {Card} from "@shared/models/pokemon.model";
import {ActivatedRoute} from "@angular/router";
import {PokemonService} from "@core/services/pokemon.service";
import {MatCard, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import {AsyncPipe, JsonPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Observable, of, switchMap, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {EnterTriggerDirective} from "@shared/directives/enter-trigger.directive";
import {MatInput} from "@angular/material/input";
import {PokemonCardsComponent} from "@shared/components/pokemon-cards/pokemon-cards.component";

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [
    MatCardImage,
    NgOptimizedImage,
    AsyncPipe,
    NgIf,
    JsonPipe,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatButton,
    NgForOf,
    EnterTriggerDirective,
    MatInput,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatError,
    PokemonCardsComponent
  ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent implements OnInit {
  private _route = inject(ActivatedRoute);
  private _pokemonService = inject(PokemonService);
  private destroyRef = inject(DestroyRef);
  private _formBuilder = inject(FormBuilder);

  card!: Card;
  similarPokemons!: Card[];
  pokemonForm!: FormGroup;

  supertypes$!: Observable<string[]>;
  subtypes$!: Observable<string[]>;
  types$!: Observable<string[]>;

  ngOnInit(): void {
    this._loadDataForSelects();
    this._initForm();
    this._getCardDetails();
    this._observeFormChanges();
  }

  private _loadDataForSelects(): void {
    this.supertypes$ = this._pokemonService.getSupertypes();
    this.subtypes$ = this._pokemonService.getSubtypes();
    this.types$ = this._pokemonService.getTypes();
  }

  private _initForm(): void {
    this.pokemonForm = this._formBuilder.group({
      name: [''],
      artist: [''],
      types: [''],
      subtypes: [''],
      supertype: [''],
      evolvesTo: [''],
      number: ['', Validators.pattern("^[0-9]*$")],
      hp: ['', Validators.pattern("^[0-9]*$")],
      resistances: this._formBuilder.array([])
    })
  }

  private _getCardDetails(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this._pokemonService.getCardDetails(id).pipe(
        tap(card => {
          this.card = card
          this._setFormValues(card);
        }),
        switchMap(card => {
          if (card.set && card.set.id) {
            return this._pokemonService.getCardsBySetId(card.set.id);
          } else {
            return of(null);
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe( (res) => {
        if (!res) return;
        console.log(res.data);
        this.similarPokemons = res.data;
      });
    }
  }

  private _setFormValues(data: Partial<Card>): void {
    if (data.resistances) {
      const resistancesArray = this.pokemonForm.get('resistances') as FormArray;
      data.resistances.forEach((resistance: any) => {
        resistancesArray.push(this._formBuilder.group({
          type: [resistance.type],
          value: [resistance.value]
        }));
      });
    }
    this.pokemonForm.patchValue({
      name: data.name,
      artist: data.artist,
      supertype: data.supertype,
      number: data.number,
      types: data.types,
      subtypes: data.subtypes,
      evolvesTo: data.evolvesTo,
      hp: data.hp
    });
  }

  private _observeFormChanges(): void {
    this.pokemonForm.valueChanges.subscribe( (formValue) => console.log('form changed: ', formValue));
  }

  private createResistanceFormGroup(): FormGroup {
    return this._formBuilder.group({
      type: [''],
      value: ['', Validators.pattern("^[0-9]*$")]
    });
  }

  get hpControl(): FormControl {
    return this.pokemonForm.get('hp') as FormControl;
  }

  get resistances(): FormArray {
    return this.pokemonForm.get('resistances') as FormArray;
  }

  addResistance(): void {
    this.resistances.push(this.createResistanceFormGroup());
  }

  removeResistance(index: number): void {
    this.resistances.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.pokemonForm.value);
  }

}
