import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-edit-pokemon',
  template: `
    <h2 class="center">Editer {{ pokemon?.name }}</h2>
    <p *ngIf="pokemon" class="center">
      <img [src]="pokemon.picture">
    </p>
    <!-- Affichage du formulaire de modification du pokemon, avec la valeur pokemon qui est attribuée à la propriété d'entrée [pokemon] -->
    <app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon"></app-pokemon-form>
  `,
})

// Logique du composant
export class EditPokemonComponent implements OnInit {

  pokemon: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute,    // permet de récupérer les infomations relatives à la route actuelle
    private pokemonService: PokemonService    // import du service Pokemon
  ) {

  }

  ngOnInit() {
    // récupération de l'id du pokemon lors de l'initialisation du composant
    const pokemonId: string | null = this.route.snapshot.paramMap.get('id')
    // Si l'id du pokemon est bien défini, récupération du pokemon depuis l'api grace à la méthode getPokemonById du service pokemon
    if (pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId)
        .subscribe(pokemon => this.pokemon = pokemon)
    } else {
      // si l'id du pokemon n'est pas défini, la valeur de pokemon est undefined
      this.pokemon = undefined
    }
  }
}
