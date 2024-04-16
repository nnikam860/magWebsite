import { Component,OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  articles:any[]=[];
  articleID: any;

  constructor(
    private apiServices: ApiServiceService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.apiServices.getArticles().subscribe((data: any) => {
      this.articles = data.allArticles;    
    });
  }

  deleteArticle(articleID: number) {
    return this.apiServices.destroyArticle(articleID).subscribe((data: any) => {
      this.ngOnInit();
      console.log(articleID);
    });
  }
  
}
