import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private article_url = 'https://api.digitalbusinessreview.com/api/v1/article'

  constructor(private http : HttpClient, ) { }
  getArticles(){
    return this.http.get(this.article_url);
  }

  destroyArticle(articleID:number){
    console.log(articleID);
    
    return this.http.delete(`https://api.digitalbusinessreview.com/api/v1/article/${articleID}`)
  }

  getArticleById(articleID:number){
    console.log(articleID);
    
    return this.http.get(`https://refactored-cod-qj7w7jg7pvx34449-3000.app.github.dev/api/v1/article/${articleID}`)
  }

}