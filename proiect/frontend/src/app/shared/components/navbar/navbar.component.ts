import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() userLogout = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  logout() {
    this.userLogout.emit(true);
    localStorage.removeItem('email');
    localStorage.removeItem("logged");
  }

}
