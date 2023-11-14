import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
})

// Logique du composant
export class ListPokemonComponent implements OnInit {

  // Initialisation de la liste pokemon
  pokemonList: Pokemon[];

  constructor(
    private router: Router,   // Service propre à angular permettant la navigation
    private pokemonService: PokemonService,   // import du service Pokemon
    ) {}

    ngOnInit() {
      // Lors de l'initialisation du composant, la liste des pokemons est récupérée depuis l'api
      this.pokemonService.getPokemonList()    // Utilisation de la méthode getPokemonList du service Pokemon
      .subscribe(pokemonList => this.pokemonList = pokemonList);    // Utilisation de la méthode subscrite, afin de s'abonner à l'observable this.pokemonService.getPokemonList() (= au flux de données) qui réalise la requête et renvoie la liste de pokemons. On précise donc qu'on va recevoir pokemonList, une fois reçue on l'attribue à la propriété pokemonList
    }

  // Création de la méthode goToPokemon qui permet d'être redirigé vers la page du pokemon concerné
  goToPokemon(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.id])
  }

}
