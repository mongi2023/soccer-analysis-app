import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { NewProjectComponent } from './newProject/newproject.component';
import { AnalyseComponent } from '../analyse/analyse.component';

const routes: Routes = [
  {
    path:'upload',component:UploadComponent
  },
  {
    path:'new',component:NewProjectComponent
  },
  {
    path:'analyse',component:AnalyseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
