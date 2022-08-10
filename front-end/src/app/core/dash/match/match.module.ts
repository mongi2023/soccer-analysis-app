import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchRoutingModule } from './match-routing.module';
import { TeamComponent } from './teams/team.component';
import { MatchDetailsComponent } from './match-details/matchDetails.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TeamComponent,
    MatchDetailsComponent
  ],
  imports: [
    CommonModule,
    MatchRoutingModule,
    ReactiveFormsModule
  ]
})
export class MatchModule { }
