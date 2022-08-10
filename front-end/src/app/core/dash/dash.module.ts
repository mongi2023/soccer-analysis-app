import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashRoutingModule } from './dash-routing.module';
import { AnalyseComponent } from './analyse/analyse.component';
import { SequenceComponent } from './sequence/sequence.component';
import { PlayersComponent } from './players/players.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AnalyseComponent,
    SequenceComponent,
    PlayersComponent
  ],
  imports: [
    CommonModule,
    DashRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]

})
export class DashModule { }
