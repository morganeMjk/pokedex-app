import { Directive, ElementRef, HostListener, Input } from '@angular/core';


// Directive : Classe angular qui n'a pas de template
// Permet d'intéragir avec des éléments html en leur attachant un comportement spécifique
// Possède un selecteur css qui indique au framework où l'activer dans notre template
// 3 types de directives : les composants, les directives d'attributs (modifie le comportement des éléments html, des attributs, des propriétés - représenté par des attributs au sein des balises html), directives structurelles (reponsable de mettre en forme d'une certaine manière les éléments html, en ajoutant, retirant ou manipulant des éléments et leurs fils - ex: ngIf, ngFor )
@Directive({
  // Selecteur à utiliser dans la balise html concernée en tant qu'attribut
  selector: '[pkmnBorderCard]'
})
// Directive d'attributs permettant de modifier le style des bordures des cards
export class BorderCardDirective {

  private initialColor: string = '#f5f5f5';
  private defaultColor: string = '#009688';
  private defaultHeight: number = 200;

  // ElementRef est propre à angular et permet de désigner l'élément du DOM sur lequel est appliqué la Directive
  constructor(private el: ElementRef) {
    this.setHeight(this.defaultHeight)
    this.setBorder(this.initialColor)
  }

  // Permet de paramétrer la couleur de la bordure avec une valeur personnalisée lors de l'intégration de la Directive dans le balise html
  @Input('pkmnBorderCard') borderColor: string; // avec alias
  // @Input() pkmnBorderCard: string; // sans alias

  // Décorateur permettant de détecter les évènements d'un élément du DOM
  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor);
  }

  // Décorateur permettant de détecter les évènements d'un élément du DOM
  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.initialColor);
  }

  setHeight(height: number) {
    this.el.nativeElement.style.height = `${height}px`    // nativeElement est complémentaire à ElementRef et permet d'accéder à l'élément natif du DOM sur lequel la Directive sera appelée
  }

  private setBorder(color: string) {
    let border = 'solid 4px' + color;
    this.el.nativeElement.style.border = border;    // nativeElement est complémentaire à ElementRef et permet d'accéder à l'élément natif du DOM sur lequel la Directive sera appelée
  }
}