import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
})

// Logique du composant
export class DetailPokemonComponent implements OnInit {

  pokemonList: Pokemon[];
  pokemon: Pokemon|undefined;

  constructor(
    private route: ActivatedRoute,    // permet de récupérer les infomations relatives à la route actuelle
    private router: Router,   // permet la navigation vers les différentes routes
    private pokemonService: PokemonService    // import du service Pokemon
    ) { }

  
  ngOnInit() {
    // récupération de l'id du pokemon lors de l'initialisation du composant
    const pokemonId: string|null = this.route.snapshot.paramMap.get('id')
    // Si l'id du pokemon est bien défini, récupération du pokemon depuis l'api grace à la méthode getPokemonById du service pokemon
    if (pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId)
        .subscribe(pokemon => this.pokemon = pokemon);
    }
  }

  deletePokemon(pokemon: Pokemon) {
    // Création de la méthode deletePokemon, à l'aide de la méthode deletePokemonById
    this.pokemonService.deletePokemonById(pokemon.id)
      .subscribe(() => this.goToPokemonList());
  }

  // Création de la méthode goToPokemonList qui permet la redirection vers la route /pokemons
  goToPokemonList() {
    this.router.navigate(['/pokemons']);
  }

    // Création de la méthode goToEditPokemon qui permet la redirection vers la route /edit/pokemon/id du pokemon concerné
  goToEditPokemon(pokemon: Pokemon) {
    this.router.navigate(['/edit/pokemon', pokemon.id])
  }

}
