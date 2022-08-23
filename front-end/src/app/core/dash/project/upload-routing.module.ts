import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { NewProjectComponent } from './newProject/newproject.component';
import { AnalyseComponent } from '../analyse/analyse.component';
import { GuardGuard } from '../../auth/guard.guard';

const routes: Routes = [
  {
    path:'upload',component:UploadComponent,canActivate: [GuardGuard]
  },
  {
    path:'new',component:NewProjectComponent,canActivate: [GuardGuard]
  },
  {
    path:'analyse',component:AnalyseComponent,canActivate: [GuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[GuardGuard]
})
export class UploadRoutingModule { }
