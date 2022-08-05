import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { DevisComponent } from './devis/devis.component';
import { AvoirAComponent } from './avoir-a/avoir-a.component';


@NgModule({
  declarations: [
    DevisComponent,
    AvoirAComponent
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule
  ]
})
export class DocumentModule { }
