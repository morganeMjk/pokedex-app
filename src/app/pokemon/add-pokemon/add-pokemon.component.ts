import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-add-pokemon',
  template: `
    <h2 class="center">Ajouter un Pokémon</h2>
    <!-- Import du formulaire de création de pokemon, avec les valeurs par défault récupérées lors de l'initialisation du composant -->
    <app-pokemon-form [pokemon]="pokemon"></app-pokemon-form>
  `,
})

// Logique du composant
export class AddPokemonComponent implements OnInit {

  pokemon: Pokemon;

  // Ajout d'un pokemon avec les valeurs par défault attribuées 
  ngOnInit() {
    this.pokemon = new Pokemon();
  }

}
