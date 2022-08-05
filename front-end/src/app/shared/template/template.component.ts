import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  show: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
 toggleBtn(){
this.show=!this.show

 }
}
