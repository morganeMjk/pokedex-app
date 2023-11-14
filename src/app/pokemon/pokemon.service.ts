import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable() // Suppression de l'injecteur racine pour éviter de surcharger l'application : nous voulons que ce service ne soit disponible que dans le pokemon module. Cf Provider du module pokemon
export class PokemonService {

  constructor(private http: HttpClient) {}    // Utilisation du HttpClient pour réaliser les requêtes

  getPokemonList(): Observable<Pokemon[]> {   // On retourne un flux de pokemons
    return this.http.get<Pokemon[]>('api/pokemons').pipe(   // On réalise une requête GET pour récupérer des données. Cette requête va retourner un tableau de Pokemon. On précise l'url attribué à la requête. L'opérateur .pipe permet de définir ce que l'on souhaite faire, en complément du traitement de la requête
      tap((response) => this.log(response)),    // L'opérateur tap est l'équivalent d'un console.log adapté à un observable. this.log fait référence à la méthode privée initialisée ligne 65
      catchError((error) => this.handleError(error, []))    // L'opérateur catchError permet d'intercepter les erreurs. On retourne un tableau vide, afin d'éviter à l'application de crash. this.handleError fait référence à la méthode privée initialisée ligne 70
    );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  searchPokemonList(term: string): Observable<Pokemon[]> {
    if (term.length <= 1) {
      return of([]);
    }

    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, [])) 
    )
  }

  updatePokemon(pokemon: Pokemon): Observable<null> {   // Si la requête s'effectue correctement, elle renvoi null
    const httpOptions = {   // Ce type de requête a besoin d'une entête, afin d'envoyer les données dans notre requête (pas seulement dans l'url de la requête)
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(    // on utilise la méthode put pour modifier les données enregistrées. On précise que les données pokemon sont transmises à l'entête de la requête. L'opérateur pipe permet de définir ce que l'on souhaite faire, en complément du traitement de la requête
      tap((response) => this.log(response)),    // L'opérateur tap est l'équivalent d'un console.log adapté à un observable. this.log fait référence à la méthode privée initialisée ligne 65
      catchError((error) => this.handleError(error, null))    // L'opérateur catchError permet d'intercepter les erreurs. On retourne un tableau vide, afin d'éviter à l'application de crash. this.handleError fait référence à la méthode privée initialisée ligne 70
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {   // On retourne un flux de pokemon
    const httpOptions = {   // Ce type de requête a besoin d'une entête, afin d'envoyer les données dans notre requête (pas seulement dans l'url de la requête)
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(    // on utilise la méthode post pour ajouter des données. On précise que les données pokemon sont transmises à l'entête de la requête. L'opérateur pipe permet de définir ce que l'on souhaite faire, en complément du traitement de la requête
      tap((response) => this.log(response)),     // L'opérateur tap est l'équivalent d'un console.log adapté à un observable. this.log fait référence à la méthode privée initialisée ligne 65
      catchError((error) => this.handleError(error, null))    // L'opérateur catchError permet d'intercepter les erreurs. On retourne un tableau vide, afin d'éviter à l'application de crash. this.handleError fait référence à la méthode privée initialisée ligne 70
    )
  }

  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }


  // Création d'une méthode privée, permettant de console.table la réponse des requêtes afin d'éviter de répéter la même opération dans les différentes requêtes
  private log(response: any) {
    console.table(response)
  }

  // Création d'une méthode privée, permettant de console.error l'erreur des requêtes afin d'éviter de répéter la même opération dans les différentes requêtes
  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Féé',
      'Vol',
      'Combat',
      'Psy'
    ];
  }
}
