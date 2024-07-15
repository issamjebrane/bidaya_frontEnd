import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../../types/user.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  loginGroupForm!:FormGroup
  error?:string;
  inputType:string = 'password';
  buttonCLicked: boolean = false
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
    this.router.navigateByUrl('/authentication/register')
  }

  toggleType(){
    this.inputType = this.inputType === 'text' ? 'password' : 'text';
  }

  submit(){
    this.buttonCLicked = true;
    const user:User = {
      email:this.loginGroupForm.value.email,
      password:this.loginGroupForm.value.password
    }
    this.authservice.login(user).subscribe({
      next: value => {
        this.error=undefined;
        this.buttonCLicked = false;
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
