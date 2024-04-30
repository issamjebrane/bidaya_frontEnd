import { Component  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})

export class HeaderComponent {

  searchToggled:Boolean = false ;
  menuToggled:Boolean = false;
  path:string='home'
  overFlow:boolean = false;
   constructor(private route: ActivatedRoute){}

   ngOnInit(){
    this.route.url.subscribe(segments=>{
       path: segments[0]?.path
    })
   }

  toggleSearch(){
    this.searchToggled = !this.searchToggled;
  }
  onToggleSearch(newValue : Boolean){
    this.searchToggled = !this.searchToggled;

  }

  onToggleMenu(newValue : Boolean){
    this.menuToggled = !this.menuToggled;
    this.overFlow = !this.overFlow;
    document.body.style.overflow = (this.overFlow ? 'hidden' : 'unset');
  }
}
