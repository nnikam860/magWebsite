import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { ReadMoreComponent } from '../read-more/read-more.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  article: any;
  articleID: string='';
  readArticle:any;
  isAdminLoggedIn: boolean = false;
  constructor(
    private apiServices: ApiServiceService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.apiServices.getArticles().subscribe((data: any) => {
      this.article = data.allArticles;
      console.log(this.article);
    });
    this.authService.isUserLoggedIn.subscribe((isUserLoggedIn) => {
      this.isAdminLoggedIn = isUserLoggedIn;
    });
  }
  readMore(articleID2: string) {
    this.apiServices.getArticleById(articleID2).subscribe((data: any) => {
      
      this.readArticle = data.readMoreArticle;
    });
    console.log(articleID2);
    this.router.navigate(['/readmore', articleID2])
  }

  deleteArticle(articleID: string) {
    return this.apiServices.destroyArticle(articleID).subscribe((data: any) => {
      this.ngOnInit();
      console.log(articleID);
    });
    alert('Article deleted successfully!');
  }
}
