import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  @Output() userInfo = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  loginEmail: string;
  loginParola: string;
  registerEmail: string;
  registerParola: string;
  registerCNP: string;
  registerCar: string;
  urlLogin: string = "api/login";
  urlRegister: string = "api/register";
  error = false;
  errorMessage = "Invalid email/parola";

  ngOnInit() {
  }

  login() {
    this.http.post(this.urlLogin + "?email=" + this.loginEmail + "&parola=" + this.loginParola, null)
      .subscribe(
        (succes) => {
          this.error = false;
          localStorage.setItem('email', this.loginEmail);
          this.userInfo.emit(true);
        },
        (error) => {
          this.error = true;
        }
      );
  }

  register() {
    this.http.post(this.urlRegister + "?email=" + this.registerEmail + "&parola=" + this.registerParola + "&cnp=" + this.registerCNP + "&nrinmatriculare=" + this.registerCar, null)
      .subscribe(
        (succes) => {
          this.error = false;
          localStorage.setItem('email', this.registerEmail);
          this.userInfo.emit(true);
        },
        (error) => {
          this.error = true;
        }
      );
  }

}
