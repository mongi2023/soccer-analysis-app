import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import {  NewProjectComponent } from './newProject/newproject.component';
import { UploadComponent } from './upload/upload.component';
import { HttpClientModule } from '@angular/common/http';
import { ProgressComponent } from './upload/progress/progress.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewProjectComponent,
    UploadComponent,
    ProgressComponent
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class UploadModule { }
