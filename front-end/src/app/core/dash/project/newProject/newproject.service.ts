import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class NewprojectService {
  baseApi=environment.baseURL
 

  constructor(private http:HttpClient) { }
    

  createProjectService(project:Project): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(project);
    console.log('body=',body)
    return this.http.post(this.baseApi + '/projects', body,{'headers':headers})
    
  }
  getAllProjectService(): Observable<Project[]>{
  return  this.http.get<Project[]>(this.baseApi+'/projects')
  }
}