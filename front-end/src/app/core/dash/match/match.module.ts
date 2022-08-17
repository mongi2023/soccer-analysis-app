import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchRoutingModule } from './match-routing.module';
import { TeamComponent } from './teams/team.component';
import { MatchDetailsComponent } from './match-details/matchDetails.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [
    TeamComponent,
    MatchDetailsComponent
  ],
  imports: [
    CommonModule,
    MatchRoutingModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),

  ]
})
export class MatchModule { }
