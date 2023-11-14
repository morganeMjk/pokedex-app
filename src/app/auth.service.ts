import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';


// Création d'un service d'authentification qui régule les critères d'authentification de l'utilisateur (ce n'est pas le role du guard)
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  redirectUrl: string;

  login(name: string, password: string): Observable<boolean> {
    const isLoggedIn = (name == "pikachu" && password == "pikachu")
    return of(isLoggedIn).pipe(
      delay(1000),
      tap(isLoggedIn => this.isLoggedIn = isLoggedIn)
    );
  }

  logout() {
    this.isLoggedIn = false;
  }
}
