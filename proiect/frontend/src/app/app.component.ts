import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  logged = false;

  constructor(private router: Router) {

  }

  ngOnInit() {
    if (localStorage.getItem('logged') == "true")
      this.logged = true;

  }

  checkLogged(confirm) {
    this.logged = confirm;
    if (this.logged) {
      localStorage.setItem("logged", "true");
      this.router.navigateByUrl("/map");
    }
    else {
      localStorage.removeItem("logged");

    }
  }

  logout() {
    this.logged = false;
    localStorage.removeItem("logged");
    console.log('intra');
  }
}
