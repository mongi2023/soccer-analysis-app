import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from '../match/team';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  baseAPI=environment.baseURL
  constructor(private _http:HttpClient) { }

  AddPlayerService(player:Player):Observable<Player>{
    return  this._http.post<Player>(this.baseAPI+'/player',player)
    }

   getPlayerByTeamService(id:string):Observable<Player>{
    console.log(id);
    
    return this._http.get<Player>(`${this.baseAPI}/player/${id}`)
   }

   getAllPlayersService():Observable<Player[]>{
    return this._http.get<Player[]>(`${this.baseAPI}/player`)

   }
  
}
