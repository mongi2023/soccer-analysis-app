import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from './team';
const httpoptions = {
  headers: new HttpHeaders
    (
      {
        'Content-Type': 'application/json'
    
      })
}
@Injectable({
  providedIn: 'root'
})
export class TeamService {

  baseAPI=environment.baseURL

 // {...this.videoData,project,user,path,origin:'local'}
  constructor(private _http:HttpClient) { }

  AddteamService(team:Team):Observable<Team>{
 
    return  this._http.post<Team>(this.baseAPI+'/team',team)
    }

    getTeamByIdService(id:string):Observable<Team>{
      return this._http.get<Team>(`${this.baseAPI}/team/${id}`)
    }
    getAllTeamsService(project:string):Observable<any>{
      console.log(project);
      
      return this._http.post<any>('http://localhost:3000/api/v1/team/teams-list',project,httpoptions)
     }

}
