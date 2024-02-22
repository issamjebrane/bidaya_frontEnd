import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {

  searchToggled:boolean = false ;

   constructor(){}
  
  toggleSearch(){
    this.searchToggled = !this.searchToggled
  }
}
