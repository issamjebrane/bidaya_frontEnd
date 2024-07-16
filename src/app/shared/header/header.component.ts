import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../../types/user.types";
import {initDrawers, initFlowbite} from "flowbite";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',

})
export class HeaderComponent implements OnInit, AfterViewInit {

  searchToggled:Boolean = false ;
  menuToggled:Boolean = false;
  path:string='home'
  overFlow:boolean = false;
   constructor(private router: ActivatedRoute,private route:Router,private authService: AuthService){}

  ngAfterViewInit() {
    initFlowbite();
    initDrawers();
  }
   ngOnInit(){
    this.router.url.subscribe(segments=>{
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

  getUserFromLocalStorage(): User {
    return this.authService.getUserFromLocalStorage();
  }

  onToggleMenu(newValue : Boolean){
    this.menuToggled = !this.menuToggled;
    this.overFlow = !this.overFlow;
    // document.body.style.overflow = (this.overFlow ? 'hidden' : 'unset');
  }

  loggOut() {
    return this.authService.logout().subscribe(() => {
      this.route.navigate(['/home']);
    }
    );
  }

  navigate(route: string) {
    this.route.navigate([`/campaign/${route}`])
  }
}
