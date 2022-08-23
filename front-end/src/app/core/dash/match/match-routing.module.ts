import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from '../../auth/guard.guard';
import { MatchDetailsComponent } from './match-details/matchDetails.component';
import { TeamComponent } from './teams/team.component';

const routes: Routes = [
  {
    path: 'matchdetails',
    component: MatchDetailsComponent,canActivate: [GuardGuard]
  },
  {
    path: 'team',
    component: TeamComponent,canActivate: [GuardGuard]
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[GuardGuard]
})
export class MatchRoutingModule {}
