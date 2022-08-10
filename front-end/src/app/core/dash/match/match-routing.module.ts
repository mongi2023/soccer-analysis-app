import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchDetailsComponent } from './match-details/matchDetails.component';
import { DevisComponent } from './devis/devis.component';

const routes: Routes = [
  {
    path: 'matchdetails',
    component: MatchDetailsComponent,
  },
  {
    path: 'devis',
    component: DevisComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchRoutingModule {}
