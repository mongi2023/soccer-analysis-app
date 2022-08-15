import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchDetailsComponent } from './match-details/matchDetails.component';
import { TeamComponent } from './teams/team.component';

const routes: Routes = [
  {
    path: 'matchdetails',
    component: MatchDetailsComponent,
  },
  {
    path: 'team',
    component: TeamComponent,
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchRoutingModule {}
