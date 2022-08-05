import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashRoutingModule } from './dash-routing.module';
import { AnalyseComponent } from './analyse/analyse.component';
import { SequenceComponent } from './sequence/sequence.component';
import { TeamsComponent } from './teams/teams.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AnalyseComponent,
    SequenceComponent,
    TeamsComponent
  ],
  imports: [
    CommonModule,
    DashRoutingModule,
    FormsModule,
    HttpClientModule
  ]

})
export class DashModule { }
