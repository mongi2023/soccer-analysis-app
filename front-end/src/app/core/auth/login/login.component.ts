import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 user!:User
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
loginController(){
this.authService.loginService(this.user).subscribe(data=>{
  console.log(data);
  
},(error)=>{
  console.log(error);
  
})
}

}
