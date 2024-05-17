import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-read-more',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.css']
})
export class ReadMoreComponent {
  articles: any;
  articleByID: any;
  articleID:any
  isAdminLoggedIn: boolean = false;
  constructor(
    private apiServices: ApiServiceService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}
  readmore(articleID:any) {
    this.apiServices.getArticleById(articleID).subscribe((data: any) => {
      this.articleByID = data.readMoreArticle;
      console.log(this.articleByID);
    });
  }
}