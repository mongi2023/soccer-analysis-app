import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchRoutingModule } from './match-routing.module';
import { DevisComponent } from './devis/devis.component';
import { MatchDetailsComponent } from './match-details/matchDetails.component';


@NgModule({
  declarations: [
    DevisComponent,
    MatchDetailsComponent
  ],
  imports: [
    CommonModule,
    MatchRoutingModule
  ]
})
export class MatchModule { }
