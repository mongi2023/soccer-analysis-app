import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  
  teams=[{
    "name": "team 001",
    "logo": "assets/img/team1.png"
  },{
    "name": "team-hamza",
    "logo": "assets/img/team2.png"
  },{
    "name": "team hicham",
    "logo": "assets/img/team3.png"
  }]
  constructor() { }

  ngOnInit(): void {
  }
 
  
}
