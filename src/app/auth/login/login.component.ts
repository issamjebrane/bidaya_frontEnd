import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  loginGroupForm!:FormGroup

  ngOnInit(): void {
    this.loginGroupForm=new FormGroup({
      email: new FormControl("",Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
      ])),
      password:new FormControl("",Validators.required)
    })
  }
  
  constructor(private router:Router){}
  
  goToRegister(){
    this.router.navigateByUrl('/authentification/register')
  }

  submit(){
    console.log(this.loginGroupForm.get('email'))
  }
}
