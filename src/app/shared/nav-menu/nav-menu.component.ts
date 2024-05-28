import { Component, Input, Output, EventEmitter } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.sass'] // Use styleUrls instead of styleUrl
})
export class NavMenuComponent {
  @Input() path?: String;
  @Input() menuToggled: Boolean = false;
  @Input() searchToggled: Boolean = false;
  overFlow: Boolean = false; // Initialize overflow to false
  @Output() toggleSearch = new EventEmitter<boolean>();
  @Output() toggleMenu = new EventEmitter<boolean>();

  toggle() {
    this.toggleSearch.emit(!this.searchToggled); // Emit the opposite of searchToggled
  }



  toggleMenu2() {
    this.toggleMenu.emit(!this.menuToggled); // Emit the opposite of menuToggled
    this.overFlow = !this.menuToggled; // Toggle overflow based on menuToggled state
    document.body.style.overflow = this.overFlow ? 'hidden' : ''; // Set overflow style
  }
}
