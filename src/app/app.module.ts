import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonModule } from './pokemon/pokemon.module';
import { InMemoryDataService } from './in-memory-data.service';
import { LoginComponent } from './login/login.component';


// @NgModule est un décorateur permettant de définir un module Angular & ses propriétés
@NgModule({
  // Liste des composants, directives et pipes (classes de vue) nécessaires à ce module
  declarations: [
    AppComponent,   // Composant racine
    PageNotFoundComponent,  
    LoginComponent
  ],
  // Liste des modules nécessaires à ce module
  imports: [
    BrowserModule,    // Module propre à angular qui fourni les éléments essentiels du projet (ngIf, ngFor...)
    FormsModule,    // Module propre à angular
    HttpClientModule,   // Module propre à angular permettant de réaliser des requêtes HTTP auprès de serveurs distants
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}),   // Import du module HttpClientInMemoryWebApiModule depuis la librairie angular-in-memory-web-api avec notre service InMemoryDataService. dataEncapsulation: false permet d'éviter d'éviter d'encapsuler les réponses de l'api dans un élément data
    PokemonModule,    // Ajout du module Pokemon afin de regrouper et organiser les composants relatifs à la gestion des pokemons. Comprend les routes relatives au module pokemon
    AppRoutingModule    // Ajout du module app-routing. S'il avait été placé avant PokemonModule, la route 404 serait générée avant les routes liées aux pokemons
  ],
  // Permet d'utiliser le système d'injection de dépendances d'angular
  providers: [],
  // Permet de définir le composant racine qui sera lancé au démarrage de l'application
  bootstrap: [AppComponent]
})
export class AppModule { }
