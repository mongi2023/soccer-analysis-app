import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  baseAPI=environment.baseURL
  constructor(private _http:HttpClient) { }

  playerService(player:Player):Observable<Player>{
    return  this._http.post<Player>(this.baseAPI+'/player',player)
    }
}
