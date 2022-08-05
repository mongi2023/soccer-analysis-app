import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 user!:User
 loginForm!: FormGroup;


  constructor(private authService:AuthService,public formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
loginController(){
this.authService.loginService(this.user).subscribe(data=>{
  console.log(data);
  
},(error)=>{
  console.log(error);
  
})
}

loginUser() {
  this.authService.loginService(this.loginForm.value)
}

}
