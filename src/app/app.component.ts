import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {initFlowbite} from "flowbite";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',

})
export class AppComponent implements OnInit{
  title = 'bidaya';
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
  }
}
