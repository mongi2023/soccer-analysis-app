import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Player } from '../../player';
import { PlayerService } from '../../player.service';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  player!:Player
  playerForm= new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    birth_date: new FormControl(new Date(), [Validators.required]),
    number: new FormControl('', [Validators.required]),
    picture: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),

  });
  constructor(private playerService:PlayerService,public formBuilder: FormBuilder,private router:Router) { 
    this.formBuilder.group(this.playerForm)

  }

  ngOnInit(): void {

  }

  getPlayerByIdTeamController(){
    console.log(`${localStorage.getItem('userId')}`);
     
      this.playerService.getPlayerByTeamService( `${localStorage.getItem('userId')}`
      ).subscribe(data=>{
     console.log(data);
     
      })
    }
  


  AddPlayerController(){
    let project=localStorage.getItem('id_project')
    let user=localStorage.getItem('userId')
    let team='62f6246bfcb19a5bcea7aeeb'
    console.log({...this.playerForm.value,project,user});
 
    this.playerService.AddPlayerService({...this.playerForm.value,project,user,team}).subscribe(data=>{
      console.log(data);
     // localStorage.setItem('userId',Object.values(data)[0].userId)
      alert('Player Added successfully')
      })
      }
  
}
