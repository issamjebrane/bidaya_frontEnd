import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resgiter',
  templateUrl: './resgiter.component.html',
  styleUrl: './resgiter.component.sass'
})
export class ResgiterComponent {
  registerGroupForm!:FormGroup

  ngOnInit(): void {
    this.registerGroupForm=new FormGroup({
      firstName: new FormControl("",Validators.required),
      lastName: new FormControl("",Validators.required),
      email: new FormControl("",Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
      ])),
      password:new FormControl("",Validators.compose([
          Validators.required,
          Validators.pattern('^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@!?.]{8,}$')
        ]))
    })
  }
  constructor(private router:Router){}
  
  goToLogin(){
    this.router.navigateByUrl('/authentification/login')
  }
}
