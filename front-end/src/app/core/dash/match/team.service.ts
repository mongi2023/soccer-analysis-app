import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from './team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  baseAPI=environment.baseURL

 // {...this.videoData,project,user,path,origin:'local'}
  constructor(private _http:HttpClient) { }

  teamService(team:Team):Observable<Team>{

    let project=localStorage.getItem('id_project')
    let user=localStorage.getItem('userId')
    let path=localStorage.getItem('path')
 
    return  this._http.post<Team>(this.baseAPI+'/team',team)
    }
}
