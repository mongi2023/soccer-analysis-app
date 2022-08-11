import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import {  NewProjectComponent } from './newProject/newproject.component';
import { UploadComponent } from './upload/upload.component';
import { HttpClientModule } from '@angular/common/http';
import { ProgressComponent } from './upload/progress/progress.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';


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
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UploadModule { }
