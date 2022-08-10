import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input()  visible = false;
  currentItem = false;
    constructor() { }

  ngOnInit(): void {
  }

  
  childEvent(x:boolean){
    this.currentItem=!x;
        console.log(this.currentItem);
        
     }
}
