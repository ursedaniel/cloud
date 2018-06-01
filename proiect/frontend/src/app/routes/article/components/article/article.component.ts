import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articleId: number;
  article: any;
  url: string = "api/article/";
  interval: number;
  email: string = localStorage.getItem('email');

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    let path = window.location.href.split('/');
    this.articleId = Number(path[path.length - 1]);

    this.getArticle();
  }

  getArticle() {
    this.http.get(this.url + this.articleId)
      .subscribe(
        (response) => {
          this.article = response;
          console.log(this.article);
        },
        (error) => {
          alert(JSON.stringify(error.error.message));
        }
      );
  }

  report() {
    this.http.post(this.url + this.articleId + "/report?email=" + this.email, null)
      .subscribe(
        (succes) => {
          alert('Raportat');
          this.getArticle();
        },
        (error) => {
          alert(JSON.stringify(error.error.message));
        }
      );
  }

  reserve() {
    this.http.post(this.url + this.articleId + "/occupy?email=" + this.email + "&minutes=" + this.interval, null)
      .subscribe(
        (succes) => {
          alert('Rezervat');
          this.getArticle();
        },
        (error) => {
          alert(JSON.stringify(error.error.message));
        }
      );
  }

}
