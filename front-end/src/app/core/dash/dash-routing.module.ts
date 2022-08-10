import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyseComponent } from './analyse/analyse.component';
import { PlayersComponent } from './players/player/player/players.component';
import { SequenceComponent } from './sequence/sequence.component';

const routes: Routes = [
  {
    path:'analyse',component:AnalyseComponent
  },
  {
    path:'sequence',component:SequenceComponent
  },
  {
    path:'players',component:PlayersComponent
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
