import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { User } from '../../../types/user.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  loginGroupForm!:FormGroup
  error?:string;
  ngOnInit(): void {
    this.loginGroupForm=new FormGroup({
      email: new FormControl("",Validators.compose([
        Validators.required,
        Validators.email,
      ])),
      password:new FormControl("",Validators.required)
    })
  }
  
  constructor(private router:Router,private authservice :AuthService){}
  
  goToRegister(){
    this.router.navigateByUrl('/authentification/register')
  }

  submit(){
    const user:User = {
      email:this.loginGroupForm.value.email,
      password:this.loginGroupForm.value.password
    }
    this.authservice.login(user).subscribe({
      next: value => {
        console.log(value);
        this.error=undefined;
        this.router.navigate(['/home'])
      },
      error: error => {
        if(error.error === "Invalid email or password"){
          this.error = error.error
        }else{
          alert('system error please try again later')
        }
      }
    });
  }
}
