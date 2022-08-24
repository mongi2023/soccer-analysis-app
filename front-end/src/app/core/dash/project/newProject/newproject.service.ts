import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from './project';
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
export class NewprojectService {
  baseApi=environment.baseURL
 

  constructor(private http:HttpClient) { }
    

  createProjectService(project:Project): Observable<Project> {
    return this.http.post<Project>(this.baseApi + '/projects', project,httpoptions)
    
  }
  getAllProjectService(): Observable<Project[]>{
  return  this.http.get<Project[]>(this.baseApi+'/projects')
  }

  deleteProjectService(id:string):Observable<Project>{
    return this.http.delete<Project>(`${this.baseApi}/projects/${id}`)
  }
  updateProjectService(id:string, params: any):Observable<any>{
    return this.http.patch<Project>(`${this.baseApi}/projects/${id}`,params)
  }

  getAllTeamsService(project:string):Observable<any>{
    
    return this.http.post<any>('http://localhost:3000/api/v1/team/teams-list/',{project},httpoptions)
   }

}