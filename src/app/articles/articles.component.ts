import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  articles: any;
  articleID: any;
  isAdminLoggedIn: boolean = false;
  constructor(
    private apiServices: ApiServiceService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.apiServices.getArticles().subscribe((data: any) => {
      this.articles = data.allArticles;
    });
    this.authService.isUserLoggedIn.subscribe((isUserLoggedIn) => {
      this.isAdminLoggedIn = isUserLoggedIn;
    });
  }

  deleteArticle(articleID: number) {
    return this.apiServices.destroyArticle(articleID).subscribe((data: any) => {
      this.ngOnInit();
      console.log(articleID);
    });
  }
}
