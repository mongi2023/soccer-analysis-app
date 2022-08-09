import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';
import { AnalyseComponent } from './analyse/analyse.component';
import { SequenceComponent } from './sequence/sequence.component';

const routes: Routes = [
  {
    path:'analyse',component:AnalyseComponent
  },
  {
    path:'sequence',component:SequenceComponent
  },
  {
    path:'teams',component:TeamsComponent
  },
  {
    path: 'project',
    loadChildren: () => import('./project/upload.module').then(m => m.UploadModule)
  },
  {
    path: 'match',
    loadChildren: () => import('./match/match.module').then(m => m.MatchModule)
  },
  {
    path: 'iventory',
    loadChildren: () => import('./iventory/iventory.module').then(m => m.IventoryModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashRoutingModule { }
