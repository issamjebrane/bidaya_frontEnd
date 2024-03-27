import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../../types/user.types';
import { error } from 'console';

@Component({
  selector: 'app-resgiter',
  templateUrl: './resgiter.component.html',
  styleUrl: './resgiter.component.sass'
})
export class ResgiterComponent {
  registerGroupForm!:FormGroup
  buttonCLicked:boolean = false;
  error?:string
  ngOnInit(): void {
    this.registerGroupForm=new FormGroup({
      firstName: new FormControl("",Validators.required),
      lastName: new FormControl("",Validators.required),
      email: new FormControl("",Validators.compose([
        Validators.required,
        Validators.email,
      ])),
      password:new FormControl("",Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)
        ]))
    })
  }
  constructor(private router:Router,private authService:AuthService){}
  
  goToLogin(){
    this.router.navigateByUrl('/authentification/login')
  }
  register(){
    this.buttonCLicked = true;
    this.error = undefined;
    const user :User = this.registerGroupForm.value;
    this.authService.register(user).subscribe({
      next: value => {
        console.log(value);
        this.error=undefined;
      },
      error: error => {
        if(error.error === "Email Already Exists"){
          this.error = error.error
        }else{
          alert('system error please try again later')
        }
        this.buttonCLicked=false;
      }
    })
  }
}
