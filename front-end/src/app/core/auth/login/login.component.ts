import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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


  constructor(private authService:AuthService,public formBuilder: FormBuilder,private router:Router) { 
    this.loginForm= this.formBuilder.group(new User('',''))
  
  }

  ngOnInit(): void {
  }
loginController(){
this.authService.loginService(this.loginForm.value).subscribe(data=>{
  console.log(Object.values(data)[0].userId);
  localStorage.setItem('userId',Object.values(data)[0].userId)
  this.router.navigate(['/'])
  })
  
}



}
