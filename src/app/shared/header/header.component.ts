import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {

  searchToggled:boolean = false ;
  menuToggled:boolean = false;
  path:string='home'

   constructor(private route: ActivatedRoute){}

   ngOnInit(){
    this.route.url.subscribe(segments=>{
       path: segments[0].path
    })
   }
  
  toggleSearch(){
    this.searchToggled = !this.searchToggled;
  }

  toggleMenu(){
    this.menuToggled = !this.menuToggled;
  }
}
