import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../match/team.service';
import { NewprojectService } from './newproject.service';
import { Project } from './project';


let names2: string[]
let paths: string[]
let descriptions: string[]

@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrls: ['./newproject.component.css'],
})
export class NewProjectComponent implements OnInit {
  displayedColumns: string[] = [ 'ProjectName','Description' ,'Actions'];
  dataSource!: MatTableDataSource<Project>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('editCompanyModal') editCompanyModal!: TemplateRef<any>;
  private editCompanyDialogRef!: MatDialogRef<TemplateRef<any>>;
  
  errMsg!:string
  project!: Project
  show=true
  path2!:string
  projects!:Project[];
  projects2!:any;
  id!:any
  projectForm= new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

  fileOutput: any;
  constructor(private newProjectService: NewprojectService
    ,private router:Router,public formBuilder: FormBuilder,
    public dialog: MatDialog,private teamService:TeamService
    ) {

     this.formBuilder.group(this.projectForm)

  }

  createProjectController() {
    this.newProjectService
      .createProjectService(this.projectForm.value)
      .subscribe((data) => {
        console.log("data=",data);
       this.getAllProjectController()
         
      },error=>{
        this.errMsg=error.error.msg
        console.log(this.errMsg);
        
        }
      );
    
  }
 
  ngOnInit(): void {

    this.getAllProjectController()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllProjectController(){
    this.newProjectService.getAllProjectService().subscribe((data)=>{
     this.projects= Object.values(data)

     this.projects2=this.projects[0]
     names2=this.projects2.map((x:any)=>x.name)
     paths=this.projects2.map((x:any)=>x.project_path)

     descriptions=this.projects2.map((x:any)=>x.description)

     //const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    
     this.dataSource = new MatTableDataSource(this.projects2);
     this.dataSource.paginator = this.paginator;

     this.dataSource.sort = this.sort;


      
    })
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
}



startProject(path:string,id:string){

  localStorage.setItem('path',path)
  localStorage.setItem('id_project',id)
  //localStorage.setItem('team_id',id_team)
  console.log( localStorage.getItem('id_project'));
  //console.log( localStorage.getItem('team_id'));
  this.getTeamsController()
  this.router.navigate(['/dash/project/upload'])
}
getTeamsController(){
  var project3= `${localStorage.getItem('id_project')}`
  console.log('id===',project3);

  this.newProjectService.getAllTeamsService(project3).subscribe(data=>{
    console.log(data.teams.map((x:any)=>x._id));
   // localStorage.setItem('id_team',data)

      })
}



deleteProjectController(id:string){
  this.newProjectService.deleteProjectService(id).subscribe(data=>{
    console.log(data);
    this.getAllProjectController()
    
  })
}


openCompanyDetailsDialog(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.restoreFocus = false;
  dialogConfig.autoFocus = false;
  dialogConfig.role = 'dialog';
  this.projectForm= new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  this.editCompanyDialogRef = this.dialog.open(this.editCompanyModal, dialogConfig);
  this.editCompanyDialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed...');
  
  });
}

closeCompanyDetailsDialog() {
  this.editCompanyDialogRef.close();

}
}