import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Player } from './player';
import { PlayerService } from './player.service';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  player!:Player
  playerForm!: FormGroup;

  constructor(private playerService:PlayerService,public formBuilder: FormBuilder,private router:Router) { 
    this.playerForm= this.formBuilder.group(new Player('','',0,'','','',''))

  }

  ngOnInit(): void {
  }
  playerController(){
    this.playerService.playerService(this.playerForm.value).subscribe(data=>{
      console.log(data);
     // localStorage.setItem('userId',Object.values(data)[0].userId)
      this.router.navigate(['/'])
      })
      
    }
  
}
