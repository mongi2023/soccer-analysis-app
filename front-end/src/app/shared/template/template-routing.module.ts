import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '../template/navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidemenuItemComponent } from './sidemenu-item/sidemenu-item.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
