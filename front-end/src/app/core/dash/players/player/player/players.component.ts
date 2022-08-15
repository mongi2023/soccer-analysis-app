import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../../../match/team';
import { NewprojectService } from '../../../project/newProject/newproject.service';
import { Player } from '../../player';
import { PlayerService } from '../../player.service';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  idTeam!:any
  id!:any
  errMsg!:any
  teams!: Team[] 
  player!:Player
  playerForm= new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    birth_date: new FormControl(new Date(), [Validators.required]),
    number: new FormControl('', [Validators.required]),
    picture: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),

  });
  constructor(private playerService:PlayerService,public formBuilder: FormBuilder,private router:Router,
    private route:ActivatedRoute ,private newProjectService:NewprojectService) { 
    this.formBuilder.group(this.playerForm)

  }

  ngOnInit(): void {

    this.getTeamsController()
   
  }





  AddPlayerController(){
    let project=localStorage.getItem('id_project')
    let user=localStorage.getItem('userId')
    let team=this.idTeam
    console.log({...this.playerForm.value,project,user,team});
 
    this.playerService.AddPlayerService({...this.playerForm.value,project,user,team}).subscribe(data=>{
      console.log(data);
     // localStorage.setItem('userId',Object.values(data)[0].userId)
      alert('Player Added successfully')
      },error=>{
        this.errMsg=error.error.msg
        console.log(this.errMsg);
        
        })
      }
      getid(id:number){
        console.log(this.teams[id]._id);
        this.idTeam=this.teams[id]._id
              }

      getTeamsController(){
        var project3= `${localStorage.getItem('id_project')}`
        console.log('id===',project3);
      
        this.newProjectService.getAllTeamsService(project3).subscribe(data=>{
          console.log(data.teams.map((x:any)=>x._id));
          console.log(data.teams.map((x:any)=>x.name));
          console.log(data);
          this.teams = data.teams
          
         // localStorage.setItem('id_team',data)
      
            })
      }
}
