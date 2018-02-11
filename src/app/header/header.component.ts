import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() appname = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onAppclick(appname:string){
    this.appname.emit(appname);
  }

}
