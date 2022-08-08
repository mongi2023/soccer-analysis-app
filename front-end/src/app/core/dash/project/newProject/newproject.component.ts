import { Component, OnInit } from '@angular/core';
import { NewprojectService } from './newproject.service';
import { Project } from './project';

@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrls: ['./newproject.component.css'],
})
export class NewProjectComponent implements OnInit {
  project=new Project("","","")
 show2=true
 path2!:string
  projects!:Project[];
  projects2!:any;

  fileOutput: any;
  constructor(private newProjectService: NewprojectService) {}

  ngOnInit(): void {
    this.getAllProjectController()
  }
  getAllProjectController(){
    this.newProjectService.getAllProjectService().subscribe(data=>{
     this.projects= Object.values(data)

     this.projects2=this.projects[0]
   console.log(this.projects[0]);

     console.log(data[0]);
     
     //console.log(this.project);

      
    })
  }
  createProjectController() {
    this.newProjectService
      .createProjectService(this.project)
      .subscribe((data) => {
        this.project = data;
        this.show2=!this.show2
        console.log(data);
        
          this.getAllProjectController()
         
      });
    
  }

  onChange(event:any) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (e: any) => {
      // The file's text will be printed here
      this.fileOutput = e.target.result;
      for (var i = 0; i < file.length; ++i) {
        if(!(file[i].webkitRelativePath.split('/').length > 2)){
            console.log(file);
            
        }
    };
    console.log(file);
    
}
}}