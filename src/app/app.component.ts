import {AfterViewInit, Component, OnInit} from '@angular/core';
import {initFlowbite} from "flowbite";
import 'flowbite'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',

})
export class AppComponent implements AfterViewInit{
  title = 'bidaya';

  ngAfterViewInit(): void {
  }
}
