import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Team } from '../team';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  team!:Team
  teamForm!: FormGroup;

  constructor(private teamService:TeamService,public formBuilder: FormBuilder,private router:Router) { 
    this.teamForm= this.formBuilder.group(new Team('','',0,'','','',''))

  }

  ngOnInit(): void {
  }
  teamController(){
    this.teamService.teamService(this.teamForm.value).subscribe(data=>{
      console.log(data);
     // localStorage.setItem('userId',Object.values(data)[0].userId)
      this.router.navigate(['/'])
      })
      
    }
  
}
