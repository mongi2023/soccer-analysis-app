import { Component, ElementRef, HostListener, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
 user!:User
 loginForm!: FormGroup;
  constructor(private authService:AuthService,public formBuilder: FormBuilder,private router:Router,private elementRef: ElementRef) { 
    this.loginForm= this.formBuilder.group(new User('',''))
  
  }
	@HostListener('document:click', ['$event', '$event.target'])
  	onClick(event: MouseEvent, targetElement: HTMLElement) {
    	if (!targetElement) {
     		return;
    	}

    	const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    	if (!clickedInside) {
      		console.log('sgfsdfsd');
          
    	}
  	}
  ngOnInit(): void {
    
  }
loginController(){
  this.authService.loginService(this.loginForm.value).subscribe(data=>{
  localStorage.setItem('fullname',Object.values(data)[0].fullname)
  localStorage.setItem('userId',Object.values(data)[0].userId)
  this.router.navigate(['dash/project/new'])
  })
  
}







}
