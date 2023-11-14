import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

// Définition des routes
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },    // Définition de la route à la racine du projet
  { path: 'login', component: LoginComponent },   // Attribution du composant Login à la route Login
  { path: '**',  component: PageNotFoundComponent }   // Attribution du composant PageNotFound pour toutes les autres routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
