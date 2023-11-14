import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";


// Un guard est un méchanisme de protection utilisé par Angular pour mettre en place l'authentification (mais pas seulement).
// Ils peuvent être utilisé pour gérer divers scénarios liés à la navigation :
// - Rediriger un utilisateur qui tente d'accéder à une route
// - L'obliger à s'authentifier pour accéder à certaines fonctionnalités
// - etc
// Ils retournent un booléen qui permet de controler le comportement de la navigation : s'il retourne true, le processus de navigation continue - s'il retourne false le processus de navigation cesse et l'utilisateur reste sur la même page
// Dans la plupart des cas le type d'un retour d'un guard est un observable qui renvoie un booléen ou une promesse et le router attendra la réponse pour agir sur la navigation
// Il existe plusieurs types de guard:
// - CanActivate : influence sur la navigation d'une route, et notamment la bloquer
// - CanActivateChild : influence sur la navigation d'une route fille, et notamment la bloquer
// - CanDeactivate : peut empêcher l'utilisateur de naviguer en dehors de la route courante (ex: si l'utilisateur a oublié de valider un formulaire avant de continuer la navigation)
// - Resolve : peut effectuer une récupération de données avant de naviguer
// - CanLoad : peut gérer la navigation vers un sous module chargé de manière asynchrone


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() {
    if(this.authService.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login'])
      return false;
    }
  }
  
}