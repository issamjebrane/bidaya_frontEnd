import { Component, Input, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.sass'
})
export class NavMenuComponent {
  @Input() path?:string
  @Input() menuToggled:Boolean = false
  @Input() searchToggled:Boolean = false
  // @ts-ignore
  @Output toggleSearch = new EventEmitter<Boolean>();
  // @ts-ignore
  @Output toggleMenu = new EventEmitter<Boolean>();
  toggle(){
    this.toggleSearch.emit(!this.toggleSearch)
  }
  toggleMenu2(){
    this.toggleMenu.emit(!this.toggleSearch)

  }
}
