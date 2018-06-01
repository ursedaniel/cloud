import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  api1 = 'https://andruxnet-random-famous-quotes.p.mashape.com/';
  api2 = 'https://img4me.p.mashape.com/';
  api3 = 'https://api.ocr.space/parse/imageurl';
  category: string = '';
  firstResponse: any = '';
  firstResponseStatus: any;
  firstDuration: number;
  quote: any;
  bcolor: any = 'FFFFFF';
  fcolor: any = '000000';
  font: any = 'trebuchet';
  size: any = '25';
  type: any = 'png';
  count = 0;
  concurent = 0;
  secondResponse: any = '';
  secondResponseStatus: any;
  secondDuration: any;
  imageUrl: any;
  thirdResponse: any = '';
  thirdResponseStatus: any;
  thirdDuration: any;
  decriptedText: any;
  external: boolean = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.count = window.performance.getEntriesByType("resource").length;
  }

  submitCategory() {
    let currentTime = new Date().getTime();
    this.concurent++;
    this.http.get(this.api1 + '?cat=' + this.category + '&count=10', {headers: new HttpHeaders().set("X-Mashape-Key", "Rlu5vDDY72mshwd9pKhMtdoPQf0np1e77cIjsnwigwY0XY0Llo")}).subscribe(
      (response: any) => {
        this.count = window.performance.getEntriesByType("resource").length;
        this.firstResponse = JSON.stringify(response);
        this.quote = response.quote;
        this.firstResponseStatus = 1;
        this.generateImage();
        this.external = true;
        this.firstDuration = new Date().getTime() - currentTime;
      },
      (error) => {
        this.firstResponse = error.error;
        this.firstResponseStatus = 0;
        this.concurent--;
        this.firstDuration = new Date().getTime() - currentTime;
      }
    )
  }

  generateImage() {
    let currentTime = new Date().getTime();
    this.concurent++;
    this.http.get(this.api2 + '?bcolor=' + this.bcolor + '&fcolor=' + this.fcolor + '&font=' + this.font +
      '&size=' + this.size + '&text=' + this.quote + '&type=' + this.type,
      {
        headers: new HttpHeaders().set("X-Mashape-Key", "Rlu5vDDY72mshwd9pKhMtdoPQf0np1e77cIjsnwigwY0XY0Llo"),
        responseType: 'text'
      }).subscribe(
      (response: any) => {
        this.count = window.performance.getEntriesByType("resource").length;
        this.secondResponse = JSON.stringify(response);
        this.imageUrl = response;
        this.secondResponseStatus = 1;
        if (this.external)
          this.concurent -= 2;
        else
          this.concurent--;
        this.external = false;
        this.secondDuration = new Date().getTime() - currentTime;
      },
      (error) => {
        this.secondResponse = error.error;
        this.secondResponseStatus = 0;
        if (this.external)
          this.concurent -= 2;
        else
          this.concurent--;
        this.secondDuration = new Date().getTime() - currentTime;
      }
    );
  }

  decriptPhoto() {
    this.concurent++;
    let currentTime = new Date().getTime();
    this.http.get(this.api3 + '?apikey=helloworld&url=' + this.imageUrl).subscribe(
      (response: any) => {
        this.count = window.performance.getEntriesByType("resource").length;
        this.thirdResponse = JSON.stringify(response);
        this.decriptedText = response.ParsedResults[0].ParsedText;
        this.thirdResponseStatus = 1;
        this.concurent--;
        this.thirdDuration = new Date().getTime() - currentTime;
      },
      (error) => {
        this.thirdResponse = error.error;
        this.thirdResponseStatus = 0;
        this.concurent--;
        this.thirdDuration = new Date().getTime() - currentTime;
      }
    );
  }
}
