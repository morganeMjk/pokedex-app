import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { BorderCardDirective } from './border-card.directive';
import { PokemonTypeColorPipe } from './pokemon-type-color.pipe';
import { RouterModule, Routes } from '@angular/router';
import { PokemonService } from './pokemon.service';
import { FormsModule } from '@angular/forms';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { SearchPokemonComponent } from './search-pokemon/search-pokemon.component';
import { LoaderComponent } from './loader/loader.component';
import { AuthGuard } from '../auth.guard';

// Ajout des routes propres au module, so_umise à vérification de l'authentification par le guard
const pokemonRoutes: Routes = [
  { path: 'edit/pokemon/:id', component: EditPokemonComponent, canActivate: [AuthGuard] },
  { path: 'pokemon/add', component: AddPokemonComponent, canActivate: [AuthGuard] },
  { path: 'pokemons', component: ListPokemonComponent, canActivate: [AuthGuard] },
  { path: 'pokemon/:id', component: DetailPokemonComponent, canActivate: [AuthGuard] },
]

// Création d'un module permettant d'optimiser l'organisation du code
@NgModule({
  // Liste des composants, directives et pipes (classes de vue) nécessaires à ce module
  declarations: [
    ListPokemonComponent,
    DetailPokemonComponent,
    BorderCardDirective,
    PokemonTypeColorPipe,
    PokemonFormComponent,
    EditPokemonComponent,
    AddPokemonComponent,
    SearchPokemonComponent,
    LoaderComponent
  ],
  // Liste des modules nécessaires à ce module
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(pokemonRoutes)
  ],
  // Permet de définir que le service Pokemon sera disponible dans tous les élements du module pokemon
  providers: [
    PokemonService
  ]
})
export class PokemonModule { }