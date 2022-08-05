import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input()  visible = true;
  @Input() item!:boolean;
  @Output() newmsg = new EventEmitter<boolean>(); 
    constructor() { }

  ngOnInit(): void {
  }
  addmessage(value: boolean) {
    this.newmsg.emit(value);
  }

}
