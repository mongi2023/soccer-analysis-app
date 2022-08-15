import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Team } from '../team';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  team!:Team
  teamForm= new FormGroup({
    name: new FormControl('', [Validators.required]),
    creation_date: new FormControl('', [Validators.required]),
    logo: new FormControl('', [Validators.required]),
    

  });

  constructor(private teamService:TeamService,public formBuilder: FormBuilder,private router:Router,
   public route: ActivatedRoute) { 
    this.formBuilder.group(this.teamForm)
    const id = route.snapshot.params['id'];
  console.log(id);
  
  }

  ngOnInit(): void {

  
  }

  AddteamController(){
    let user=localStorage.getItem('userId')
    let project=localStorage.getItem('id_project')

console.log({...this.teamForm.value,user});

    this.teamService.AddteamService({...this.teamForm.value,user,project}).subscribe(data=>{
      console.log(data);
      alert('Team Added Successfully')
      
      })
      
    }
  
}
