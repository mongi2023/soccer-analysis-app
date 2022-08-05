import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvoirAComponent } from './avoir-a/avoir-a.component';
import { DevisComponent } from './devis/devis.component';

const routes: Routes = [
  {
    path: 'avoirA',
    component: AvoirAComponent,
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
export class DocumentRoutingModule {}
