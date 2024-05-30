import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../../types/user.types";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',

})

export class HeaderComponent {

  searchToggled:Boolean = false ;
  menuToggled:Boolean = false;
  path:string='home'
  overFlow:boolean = false;
   constructor(private route: ActivatedRoute,private authService: AuthService){}

   ngOnInit(){
    this.route.url.subscribe(segments=>{
       this.path = segments[0]?.path
    })
   }

  toggleSearch(){
    this.searchToggled = !this.searchToggled;
  }
  onToggleSearch(newValue : Boolean){
    this.searchToggled = !this.searchToggled;

  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUserFromLocalStorage(): User{
    return this.authService.getUserFromLocalStorage();
  }

  onToggleMenu(newValue : Boolean){
    this.menuToggled = !this.menuToggled;
    this.overFlow = !this.overFlow;
    // document.body.style.overflow = (this.overFlow ? 'hidden' : 'unset');
  }
}
