import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})

// Logique du composant
export class PokemonFormComponent implements OnInit {

  // On définit une propriété d'entrée. Lors de l'utilisation du composant form dans un autre composant, la valeur du pokemon devra être attribuée à l'attribut [pokemon]
  @Input() pokemon: Pokemon;

  types: string[];

  isAddForm: boolean;

  constructor(
    private pokemonService: PokemonService,   // Import du service Pokemon
    private router: Router    // Service propre à angular permettant la navigation
  ) {

  }

  ngOnInit() {
    this.types = this.pokemonService.getPokemonTypeList();    // Récupération de la liste de tous les types depuis le service pokemon
    this.isAddForm = this.router.url.includes('add');   // Vérification de la route actuelle pour déterminer le type de formulaire
  }

  hasType(type: string): boolean {
    return this.pokemon.types.includes(type);     // Vérification de la présence du type dans la liste des types du pokemon  
  }

  selectType($event: Event, type: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;   // Vérification de la valeur de l'attribut check de l'input

    // Si l'input est check, ajout du type à la liste des types du pokemon
    if (isChecked) {
      this.pokemon.types.push(type)
    } else {
      // Si l'input n'est pas check, suppression du type de la liste des types du pokemon
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }

  isTypesValid(type: string): boolean {
    // Vérifie si le Pokémon a exactement un type et que ce type est égal au type donné en argument.
    if (this.pokemon.types.length == 1 && this.hasType(type)) {
      return false;
    }
    // Vérifie si le Pokémon a plus de deux types et que le type donné en argument n'est pas présent.
    if (this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false;
    }

    return true;
  }

  onSubmit() {
    // Si la route correspond à l'ajout d'un pokemon, création du pokemon avec les données du pokemon présent en paramètre et redirection vers la page du nouveau pokemon
    if (this.isAddForm) {
      this.pokemonService.addPokemon(this.pokemon)
        .subscribe((pokemon: Pokemon) => this.router.navigate(['/pokemon', pokemon.id]));
    } else {
      // Sinon, modification des données du pokemon et redirection vers la page du pokemon concerné
      this.pokemonService.updatePokemon(this.pokemon)
        .subscribe(() => this.router.navigate(['/pokemon', this.pokemon.id]));
    }
  }

}
