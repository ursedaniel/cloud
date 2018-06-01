import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: any;
  email: string = "test@gmail.com";
  url: string = "api/user";
  balance: number;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.http.get(this.url + "?email=" + this.email)
      .subscribe(
        (response) => {
          this.user = response;
        },
        (error) => {
        }
      );
  }

  update() {
    this.http.put(this.url + "?email=" + this.email + "&money=" + this.balance, null)
      .subscribe(
        (succes) => {
          alert('Updated');
          this.getUser();
        },
        (error) => {
          alert(JSON.stringify(error.error.message));
        }
      );
  }

}
