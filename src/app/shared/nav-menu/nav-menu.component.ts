import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.sass'
})
export class NavMenuComponent {
  @Input() path?:string
  @Input() menuToggled:boolean = false
}
